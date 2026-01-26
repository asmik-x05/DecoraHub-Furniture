import express from "express";
import cartController from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validator.js";
import { cartSchema } from "../libs/schemas/cart.js";

const router = express.Router();

router.put("/", auth, validate(cartSchema), cartController.saveCart);
router.get("/", auth, cartController.getCart);

export default router;
