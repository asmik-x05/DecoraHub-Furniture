import orderService from "../services/order.service.js";

const createOrder = async (req, res) => {
  try {
    const createdOrder = await orderService.createOrder(req.body, req.user._id);
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getOrder = async (req, res) => {
  try {
    const orderList = await orderService.getOrder();
    res.json(orderList);
  } catch (error) {
    res.status(staus || 400).send(error?.message);
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orderList = await orderService.getOrderByUser(req.user._id);
    res.json(orderList);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderList = await orderService.getOrderById(req.params.id);
    res.json(orderList);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const data = await orderService.updateOrderStatus(
      req.params.id,
      req.body?.status,
    );

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const data = await orderService.cancelOrder(req.user, req.params.id);
    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const orderPaymentViaKhalti = async (req, res) => {
  try {
    const data = await orderService.orderPaymentViaKhalti(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const confirmOrderPayment = async (req, res) => {
  if (!req.body?.status) return res.status(400).send("!! status is required");
  try {
    const data = await orderService.confirmOrderPayment(
      req.params.id,
      req.body.status,
    );
    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const orderViaCash = async (req, res) => {
  try {
    const data = await orderService.orderViaCash(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

export default {
  createOrder,
  getOrder,
  getOrderByUser,
  getOrderById,
  cancelOrder,
  orderPaymentViaKhalti,
  confirmOrderPayment,
  orderViaCash,
  updateOrderStatus,
};