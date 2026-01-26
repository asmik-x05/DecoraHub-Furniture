import cartService from "../services/cart.service.js";

const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user._id);

    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send(error?.mesasge);
  }
};

const saveCart = async (req, res) => {
  try {
    const createdCart = await cartService.saveCart(req.user._id, req.body);

    res.status(200).send(createdCart);
  } catch (error) {
    res.send(error?.status || 400).send(error?.mesasge);
  }
};

export default { saveCart, getCart };
