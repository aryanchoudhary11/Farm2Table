import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", protect, restrictTo("customer"), createOrder);

export default router;
