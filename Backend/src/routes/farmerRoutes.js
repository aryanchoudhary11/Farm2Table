import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  addproduct,
  getDashboard,
  getFarmerOrders,
  getProduct,
  updateOrderStatus,
} from "../controllers/farmerController.js";

const router = express.Router();

router.get("/", protect, restrictTo("farmer"), getDashboard);
router.post("/add-product", protect, restrictTo("farmer"), addproduct);
router.get("/my-products", protect, restrictTo("farmer"), getProduct);
router.get("/track-orders", protect, restrictTo("farmer"), getFarmerOrders);
router.put(
  "/track-orders/:id",
  protect,
  restrictTo("farmer"),
  updateOrderStatus
);

export default router;
