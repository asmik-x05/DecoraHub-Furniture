import mongoose from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";

const paymentSchema = new mongoose.Schema({
  transactioinId: {
    type: String,
  },
  amount: {
    type: String,
    required: [true, "amount is required"],
  },
  method: {
    type: String,
    required: [true, "payment method is required"],
    enum: ["CARD", "ONLINE", "CASH"],
  },
  status: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "SUCESS", "FAILED"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const model = mongoose.model("Payment", paymentSchema);

export default model;
