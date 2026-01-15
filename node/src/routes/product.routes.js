import auth from "../middlewares/auth.js";
import authorizeRole from "../middlewares/roleBasedAuth.js";
import express from "express";
import productController from "../controllers/product.controller.js";
import { ROLE_MERCHANT } from "../constants/roles.js";

const router = express.Router();

router.delete(
  "/:id",
  auth,
  authorizeRole(ROLE_MERCHANT),
  productController.deleteProduct
);

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductsById);

router.post(
  "/",
  auth,
  authorizeRole(ROLE_MERCHANT),
  productController.createProduct
);

router.put(
  "/:id",
  auth,
  authorizeRole(ROLE_MERCHANT),
  productController.updateProduct
);

export default router;
