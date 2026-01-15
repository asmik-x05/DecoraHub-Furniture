import Product from "../models/Product.js";

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

const createProduct = async (data) => {
  return await Product.create(data);
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
