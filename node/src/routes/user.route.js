import auth from "../middlewares/auth.js";
import authorizeRole from "../middlewares/roleBasedAuth.js";
import express from "express";
import userController from "../controllers/user.controller.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", auth, authorizeRole(ROLE_ADMIN), userController.getUsers);
router.post("/", auth, authorizeRole(ROLE_ADMIN), userController.createUser);

export default router;
