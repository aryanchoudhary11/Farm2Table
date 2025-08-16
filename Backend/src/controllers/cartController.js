import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; //from where
    const customerId = req.user._id;

    const product = await Product.findById(req.body.productId);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    let cartItem = await Cart.findOne({
      customer: customerId,
      product: productId,
    });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
    } else {
      cartItem = new Cart({
        customer: customerId,
        product: productId,
        quantity: quantity || 1,
      });
    }
    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const customerId = req.user._id;
    const cartItems = await Cart.find({ customer: customerId }).populate(
      "product"
    );
    res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartItem = await Cart.findById(id);
    if (!cartItem) return res.status(404).json({ message: "Item not found" });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
