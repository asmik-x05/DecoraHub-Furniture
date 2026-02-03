import mongoose from "mongoose";

const BlogDescriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "blog cannot be posted without title"],
    },
  },
  { timestamps: true },
);

const model = mongoose.model("BlogDescription", BlogDescriptionSchema);

export default model;
