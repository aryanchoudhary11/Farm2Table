import express from "express";
import {
  getMyOrders,
  getOrderById,
  createPaymentIntent,
  confirmOrder,
} from "../controllers/orderController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-payment-intent",
  protect,
  restrictTo("customer"),
  createPaymentIntent
);
router.post("/checkout", protect, restrictTo("customer"), confirmOrder);

router.get("/my-orders", protect, restrictTo("customer"), getMyOrders);
router.get("/track-order/:id", protect, restrictTo("customer"), getOrderById);

export default router;
