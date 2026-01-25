import Product from "../models/Product.js";
import uploadFile from "../utils/fileUploader.js";

const getProducts = async (query) => {
  const { category, brand, name, min, max, limit, offset } = query;
  const filters = {};

  const sort = query.sort ? JSON.parse(query.sort) : {};

  if (category) filters.category = { $in: category.split(",") };
  if (brand) filters.brand = { $in: brand.split(",") };
  if (name) filters.name = { $regex: name, $options: "i" };
  if (max || min) filters.price = { $gte: min, $lte: max };

  return await Product.find(filters).sort(sort).limit(limit).skip(offset);
};

const getProductsById = (id) => {
  const data = Product.findById(id);
  return data;
};

const createProduct = async (data, files) => {
  const uploadedFiles = await uploadFile(files);
  const imageUrls = uploadedFiles.map((item) => item.url);
  return await Product.create({...data,imageUrls});
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

export default {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
