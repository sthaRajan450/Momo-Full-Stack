import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    foods: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    paymentStatus: {
      type: String,
      enum: [
        "PENDING",
        "COMPLETE",
        "FULL_REFUND",
        "PARTIAL_REFUND",
        "AMBIGUOUS",
        "NOT_FOUND",
        "CANCELED",
        "Service is currently unavailable",
      ],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
