import express from "express";
import { getProducts } from "../controllers/customerController.js";
import {
  addToCart,
  getCart,
  updateCartQuantity,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/cart", protect, addToCart);
router.get("/cart", protect, getCart);
router.put("/cart/:id", protect, updateCartQuantity);

export default router;
