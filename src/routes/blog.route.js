import express from "express";
import blogController from "../controllers/blog.controller.js";
import auth from "../middlewares/auth.js";
import authorizeRole from "../middlewares/roleBasedAuth.js";
import { ROLE_USER } from "../constants/roles.js";

const router = express.Router();

router.get("/", blogController.getBlogs);
router.post("/", auth, authorizeRole(ROLE_USER), blogController.postBlog);

export default router;
