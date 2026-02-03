import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: [true, "blog cannot be posted without title"],
    },
    shortDescription: {
      type: String,
      required: [true, "short description is not optional"],
    },
    thumbnailImgUrl: {
      type: String,
      required: [true, "thumbnail image is required"],
    },
    description: {
      type: mongoose.Schema.ObjectId,
      ref: "BlogDescription",
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Blog", BlogSchema);

export default model;
