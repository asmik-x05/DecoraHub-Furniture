import express from "express";
import orderController from "../controllers/order.controller.js";
import auth from "../middlewares/auth.js";
import authorizeRole from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import { orderSchema } from "../libs/schemas/order.js";

const router = express.Router();

router.post(
  "/",
  auth,
  authorizeRole(ROLE_USER),
  validate(orderSchema),
  orderController.createOrder,
);

router.get("/", auth, authorizeRole(ROLE_ADMIN), orderController.getOrder);

router.get(
  "/user",
  auth,
  authorizeRole(ROLE_USER),
  orderController.getOrderByUser,
);

router.get(
  "/:id",
  auth,
  authorizeRole(ROLE_ADMIN),
  orderController.getOrderById,
);
router.put(
  "/:id/status",
  auth,
  authorizeRole(ROLE_ADMIN),
  orderController.updateOrderStatus,
);

router.put("/:id/cancel", auth, orderController.cancelOrder);

router.post(
  "/:id/payment/khalti",
  auth,
  authorizeRole(ROLE_USER),
  orderController.orderPaymentViaKhalti,
);

router.put(
  "/:id/confirm-payment",
  auth,
  authorizeRole(ROLE_USER),
  orderController.confirmOrderPayment,
);

router.post(
  "/:id/payment/cash",
  auth,
  authorizeRole(ROLE_USER),
  orderController.orderViaCash,
);

export default router;
