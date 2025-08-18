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

export const updateMyProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      farmer: req.user._id,
    });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized" });
    }

    const { name, quantity, price } = req.body;

    if (name) product.name = name;
    if (quantity !== undefined) product.quantity = quantity;
    if (price !== undefined) product.price = price;

    if (req.file) {
      product.image = req.file.filename;
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("Error updating product:", err);
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

export const getFarmerOrders = async (req, res) => {
  try {
    const farmerId = req.user._id;
    const orders = await Order.find({ "items.product": { $exists: true } })
      .populate({
        path: "items.product",
        match: { farmer: farmerId },
        select: "name price farmer",
      })
      .populate("customer", "name email");
    const farmerOrders = orders
      .map((order) => {
        const filteredItems = order.items.filter(
          (i) =>
            i.product && i.product.farmer.toString() === farmerId.toString()
        );
        if (filteredItems.length > 0) {
          return {
            _id: order._id,
            customer: {
              name: order.customer?.name,
              email: order.customer?.email,
            },
            items: filteredItems,
            address: order.address,
            status: order.status,
            createdAt: order.createdAt,
          };
          return null;
        }
      })
      .filter(Boolean);
    res.json(farmerOrders);
  } catch (error) {
    console.error("Error fetching farmer orders:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id)
      .populate("items.product")
      .populate("customer", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const farmerId = req.user._id;
    const ownsProduct = order.items.some(
      (i) => i.product && i.product.farmer.toString() === farmerId.toString()
    );
    if (!ownsProduct) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this order" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: error.message });
  }
};
