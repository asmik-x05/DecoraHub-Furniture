import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Rating from "../models/Rating.js";
import uploadFile from "../utils/fileUploader.js";
import { ORDER_STATUS_DELIVERED } from "../constants/orderStatuses.js";
import promptAI from "../utils/ai.js";
import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";

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
  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
    .replace("%s", data.brand)
    .replace("%s", data.category);

  const description = data.description ?? (await promptAI(promptMessage));
  return await Product.create({ ...data, imageUrls, description });
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

const rateProduct = async (productId, userId, data) => {
  const orders = await Order.find({
    user: userId,
    "orderIteam.product": productId,
    status: ORDER_STATUS_DELIVERED,
  }).sort({ createdAt: -1 });
  if (orders.length === 0) {
    throw { message: "You can rate only purchased products", status: 403 };
  }

  let matchedItem;
  for (const order of orders) {
    matchedItem = order.orderIteam.find(
      (item) => item.product.toString() === productId.toString(),
    );

    if (matchedItem) break;
  }
  if (!matchedItem) {
    throw { message: "You can rate only purchased products", status: 403 };
  }
  const oldrating = await Rating.findOne({ orderItemId: matchedItem._id });
  if (!oldrating) {
    const newRating = await Rating.create(
      {
        user: userId,
        product: productId,
        rating: data.rating,
        comment: data.comment,
        orderItemId: matchedItem._id,
      },
      { new: true },
    );
    return newRating;
  }
  const updatedRating = await Rating.findByIdAndUpdate(
    oldrating._id,
    {
      rating: data.rating,
      comment: data.comment,
    },
    { new: true },
  );
  return updatedRating;
};
const getTotalCount = async () => {
  return await Product.countDocuments();
};

const getBrands = async () => {
  return await Product.distinct("brand");
};

const getCategories = async () => {
  return await Product.distinct("category");
};

export default {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
  getTotalCount,
  getBrands,
  getCategories,
};
