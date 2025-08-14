import express from "express";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  addProduct,
  getDashboard,
  getFarmerOrders,
  getProduct,
  updateOrderStatus,
} from "../controllers/farmerController.js";
import { upload } from "../middleware/multerConfig.js";
const router = express.Router();

router.get("/", protect, restrictTo("farmer"), getDashboard);
router.post(
  "/add-product",
  protect,
  restrictTo("farmer"),
  upload.single("image"),
  addProduct
);
router.get("/my-products", protect, restrictTo("farmer"), getProduct);
router.get("/track-orders", protect, restrictTo("farmer"), getFarmerOrders);
router.put(
  "/track-orders/:id",
  protect,
  restrictTo("farmer"),
  updateOrderStatus
);

export default router;
