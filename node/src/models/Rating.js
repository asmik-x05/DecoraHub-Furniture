import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    orderItemId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Rating", RatingSchema);

export default model;
