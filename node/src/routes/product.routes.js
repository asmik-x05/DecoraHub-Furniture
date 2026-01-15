import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.delete("/:id", productController.deleteProduct);
router.get("/", productController.getProduct);
router.get("/:id", productController.getProductsById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);

export default router;
