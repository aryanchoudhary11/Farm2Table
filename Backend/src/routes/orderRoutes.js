import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", protect, restrictTo("customer"), createOrder);
router.get("/my-orders", protect, restrictTo("customer"), getMyOrders);
router.get("/track-order/:id", protect, restrictTo("customer"), getOrderById);

export default router;
