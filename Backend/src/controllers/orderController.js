import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

export const createPaymentIntent = async (req, res) => {
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
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "inr",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      totalAmount,
    });
  } catch (err) {
    console.error("Error creating PaymentIntent:", err);
    res.status(500).json({ message: "Failed to create PaymentIntent" });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { items, address, paymentIntentId } = req.body;
    const customerId = req.user._id;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product)
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` });

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      farmer: orderItems[0].product, // TODO: handle multiple farmers properly
      customer: customerId,
      address,
      items: orderItems,
      totalAmount,
      paymentIntentId,
    });

    res.status(201).json({
      message: "Order confirmed successfully",
      order,
    });
  } catch (err) {
    console.error("Error confirming order:", err);
    res.status(500).json({ message: "Failed to confirm order" });
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

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;
    const order = await Order.findOne({
      _id: orderId,
      customer: userId,
    }).populate("items.product", "name price"); //why ?
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error" });
  }
};
