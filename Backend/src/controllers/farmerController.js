import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const addproduct = async (req, res) => {
  try {
    const { name, price, quantity, category, harvestDate, image } = req.body;

    if (!name || !price || !quantity || !category || !harvestDate || !image) {
      res.status(400).json({ message: "All fields are required" });
    }
    const product = await Product.create({
      name,
      price,
      quantity,
      category,
      harvestDate,
      image,
      farmer: req.user._id,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const farmerID = req.user._id;
    const totalProducts = await Product.countDocuments({ farmer: farmerID });
    const totalOrders = await Order.countDocuments({ farmer: farmerID });
    const walletBalance = 1250;
    res.status(200).json({
      totalProducts,
      totalOrders,
      walletBalance,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFarmerOrders = async (req, res) => {
  try {
    const farmerID = req.user._id;
    const orders = await Order.find({ farmer: farmerID })
      .populate("customer", "name email")
      .populate("products.product", "name")
      .sort({ createdAt: -1 });
    const formattedOrders = orders.map((order) => ({
      id: order._id,
      customerName: order.customer.name,
      address: order.address,
      items: order.products.map((p) => ({
        name: p.product.name,
        qty: p.quantity,
      })),
      status: order.status,
      deliveryTime: order.deliveryTime
        ? order.deliveryTime.toLocaleString()
        : "N/A",
    }));
    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const farmerId = req.user._id;
    const orderId = req.params.id;
    const { status } = req.body;

    if (!["Pending", "Packed", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findOne({ _id: orderId, farmer: farmerId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated", status: order.status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
