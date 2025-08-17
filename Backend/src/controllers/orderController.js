import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

export const createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    const customerId = req.body._id;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product)
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` });

      const subTotal = product.price * item.quantity;
      totalAmount += subTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "inr",
      metadata: { customerId: customerId.toString() },
    });

    const order = await Order.create({
      farmer: orderItems[0].product, //will improve
      customer: customerId,
      address,
      items: orderItems,
      totalAmount,
      paymentIntentId: paymentIntent.id,
    });

    res.status(201).json({
      message: "Order created successfully",
      clientSecret: paymentIntent.client_secret,
      order,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};
