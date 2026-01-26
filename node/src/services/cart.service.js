import Cart from "../models/Cart.js";

const getCart = async (id) => {
  const cartItems = await Cart.findOne({ user: id });

  if (!cartItems)
    return { message: "Your Cart in Empty add products to view Cart Items" };

  return cartItems;
};

const saveCart = async (id, data) => {
  const items = await Cart.findOne({ user: id });

  if (!items) {
    return Cart.create({
      ...data,
      user: id,
    });
  }

  const updatedCart = await Cart.findByIdAndUpdate(items._id, data, {
    new: true,
  });

  return updatedCart;
};

export default { saveCart, getCart };
