import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 5,
    },
  },
  {
    timestamps: true,
  },
);

const Food = mongoose.model("Food", foodSchema);
export default Food;
