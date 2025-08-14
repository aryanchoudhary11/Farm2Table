import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, quantity, category, harvestDate } = req.body;

    if (!name || !price || !quantity || !category || !harvestDate) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const savedProduct = await Product.create({
      name,
      price,
      quantity,
      category,
      harvestDate,
      image: req.file.filename,
      farmer: req.user._id,
    });

    res.status(201).json({
      success: true,
      product: {
        ...savedProduct.toObject(),
        imageUrl: `/uploads/products/${req.file.filename}`,
      },
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id }).sort({
      updatedAt: -1,
    });
    const formatted = products.map((p) => ({
      id: p._id,
      name: p.name,
      image: p.image,
      quantity: p.quantity,
      price: p.price,
      lastUpdated: p.updatedAt.toISOString().split("T")[0],
    }));
    res.status(200).json(formatted);
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

export const updateMyProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      farmer: req.user._id,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found or not authorized" });
    }
    const { name, quantity, price, image } = req.body;
    if (name) product.name = name;
    if (quantity !== undefined) product.quantity = quantity;
    if (price !== undefined) product.price = price;
    if (image) product.image = image;
    await product.save();
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      farmer: req.user._id,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found or not authorized" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
