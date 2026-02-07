import auth from "../middlewares/auth.js";
import authorizeRole from "../middlewares/roleBasedAuth.js";
import express from "express";
import productController from "../controllers/product.controller.js";
import { ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";
import { ratingSchema } from "../libs/schemas/rating.js";
import validate from "../middlewares/validator.js";

const router = express.Router();

router.get("/brands", productController.getBrands);

router.get("/categories", productController.getCategories);

router.delete(
  "/:id",
  auth,
  authorizeRole(ROLE_MERCHANT),
  productController.deleteProduct,
);

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductsById);

router.post(
  "/",
  auth,
  authorizeRole(ROLE_MERCHANT),
  productController.createProduct,
);

router.put(
  "/:id",
  auth,
  authorizeRole(ROLE_MERCHANT),
  productController.updateProduct,
);

router.post(
  "/:id/rating",
  auth,
  authorizeRole(ROLE_USER),
  validate(ratingSchema),
  productController.rateProduct,
);

router.get("/total", productController.getTotalCount);

export default router;
