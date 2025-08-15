import express from "express";
import { getProducts } from "../controllers/customerController.js";
import { addToCart, getCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/cart", protect, addToCart);
router.get("/cart", protect, getCart);

export default router;
