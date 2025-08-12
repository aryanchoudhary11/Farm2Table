import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: { type: String, required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Packed", "Delivered"],
      default: "Pending",
    },
    deliveryTime: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
