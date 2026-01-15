import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product cannot be created without Name !!"],
  },
  brand: {
    type: String,
    default: "noBrand",
  },
  category: {
    type: [String],
    default: "others",
  },
  stock: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, "A product must always have a Price"],
  },
  imageUrl: {
    type: [String],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const model = mongoose.model("Product", productSchema);

export default model;
