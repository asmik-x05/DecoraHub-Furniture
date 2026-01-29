import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Cart cannot be created without user"],
      ref: "User",
      unique: true,
    },

    Items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity cannot be less than one"],
        },
      },
    ],
  },
  { timestamps: true },
);

const model = mongoose.model("cart", cartSchema);

export default model;
