import express from "express";
import { getProducts } from "../controllers/customerController.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cartController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, restrictTo("customer"), getProducts);
router.post("/cart", protect, restrictTo("customer"), protect, addToCart);
router.get("/cart", protect, restrictTo("customer"), protect, getCart);
router.put(
  "/cart/:id",
  protect,
  restrictTo("customer"),
  protect,
  updateCartQuantity
);
router.delete(
  "/cart/:id",
  protect,
  restrictTo("customer"),
  protect,
  removeFromCart
);
export default router;
