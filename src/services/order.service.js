import {
  ORDER_STATUS_CANCLED,
  ORDER_STATUS_CONFIRMED,
} from "../constants/orderStatuses.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { paymentViaKhalti } from "../utils/payment.js";

const createOrder = async (data, userId) => {
  return await Order.create({ ...data, user: userId });
};

const getOrder = async () => {
  return await Order.find()
    .populate("user", "name email phone")
    .populate(
      "orderIteam.product",
      "name brand price imageUrls description category",
    );
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate(
      "orderIteam.product",
      "name brand price imageUrls description category",
    );
  if (!order)
    throw {
      status: 404,
      message: "!! you havent created any order Yet !!",
    };

  return order;
};
const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const getOrderByUser = async (userId) => {
  const order = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "name email phone")
    .populate(
      "orderIteam.product",
      "name brand price imageUrls description category",
    );
  if (!order)
    throw {
      status: 404,
      message: "!! you havent created any order Yet !!",
    };

  return order;
};

const cancelOrder = async (user, id) => {
  const order = await getOrderById(id);
  if (!user.Role.includes(ROLE_ADMIN) && order.user._id != user._id)
    throw {
      status: 403,
      message: "acess denied",
    };

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCLED },
    { new: true },
  );
};

// payment for order via khalti

const orderPaymentViaKhalti = async (id) => {
  const order = await getOrderById(id);
  const orderPayment = await Payment.create({
    method: "ONLINE",
    amount: order.totalPrice,
  });
  await Order.findByIdAndUpdate(id, { payment: orderPayment._id });

  return await paymentViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.orderNumber,
    purchaseOrderName: order.orderIteam[0].product.name,
    customer: order.user,
  });
};

// payment confirmation if paid by khalti

const confirmOrderPayment = async (id, status) => {
  const order = await getOrderById(id);
  if (status.toUpperCase() != "COMPLETED") {
    await Payment.findByIdAndUpdate(order.payment, { status: "FAILED" });
    throw {
      status: 400,
      message: "payment failled",
    };
  }
  await Payment.findByIdAndUpdate(order.payment, { status: "SUCESS" });

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED },
    { new: true },
  );
};

// For COD

const orderViaCash = async (id) => {
  const order = await getOrderById(id);
  const orderPayment = await Payment.create({
    method: "CASH",
    amount: order.totalPrice,
  });

  return await Order.findByIdAndUpdate(
    id,
    { payment: orderPayment._id, status: ORDER_STATUS_CONFIRMED },
    { new: true },
  );
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
