import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import farmerRoutes from "./src/routes/farmerRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import path from "path";

connectDB();

const app = express();

// Middleware

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/products", customerRoutes);
app.use("/api/products", orderRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("Farm2Table API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
