import Blog from "../models/Blog.js";
import uploadFile from "../utils/fileUploader.js";

const postBlog = async (data, userId, file) => {
  const uploadedFile = await uploadFile([file]);
  
  const createdBlog = await Blog.create({
    ...data,
    user: userId,
    thumbnailImgUrl: uploadedFile[0].url,
  });

  if (!createdBlog) {
    throw { status: 400, message: "Blog creation failed" };
  }

  return createdBlog;
};
const getBlogs = async () => {
  const data = await Blog.find().populate("user", "name");
  if (!data) {
    throw { status: 400, message: "No blogs found" };
  }
  return data;
};

export default { getBlogs, postBlog };
