import mongoose from "mongoose";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_CANCLED,
  ORDER_STATUS_SHIPPED,
  ORDER_STATUS_DELIVERED,
} from "../constants/orderStatuses.js";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "order cannot br created without user"],
    ref: "User",
  },
  status: {
    type: String,
    default: ORDER_STATUS_PENDING,
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_CANCLED,
      ORDER_STATUS_SHIPPED,
      ORDER_STATUS_DELIVERED,
    ],
  },

  orderIteam: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Order cannot be created without a product"],
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, "Quantity cannot be less than one"],
      },
    },
  ],
  shippingAddress: {
    city: {
      type: String,
      required: [true, "Address must be specified to place a order"],
    },
    province: {
      type: String,
      required: [true, "Address must be specified to place a order"],
    },
    street: {
      type: String,
    },
    country: { type: String, default: "Nepal" },
  },

  totalPrice: {
    type: Number,
    required: [true, "Order cannot be created without having price"],
  },

  orderNumber: { type: String, required: [true, "Order number is required"] },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },

  payment: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
});

const model = mongoose.model("order", orderSchema);
export default model;
