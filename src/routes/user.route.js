import auth from "../middlewares/auth.js";
import authorizeRole from "../middlewares/roleBasedAuth.js";
import express from "express";
import userController from "../controllers/user.controller.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.get("/", auth, authorizeRole(ROLE_ADMIN), userController.getUsers);
router.post("/", auth, authorizeRole(ROLE_ADMIN), userController.createUser);

router.patch("/update-profile", auth, userController.updateProfile);

router.get("/profile", auth, userController.getLoggedInUser);

router.get("/:id", auth, authorizeRole(ROLE_ADMIN), userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", authorizeRole(ROLE_ADMIN), userController.deleteUser);

router.put(
  "/:id/roles",
  auth,
  authorizeRole(ROLE_ADMIN),

  userController.updateUserRoles,
);

export default router;
