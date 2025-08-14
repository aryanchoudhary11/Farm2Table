import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive number"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity must be at least 0"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Fruits", "Vegetables", "Dairy", "Grains", "other"],
    },
    harvestDate: {
      type: Date,
      required: [true, "Harvest date is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
