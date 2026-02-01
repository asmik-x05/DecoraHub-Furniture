import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDb from "./config/database.js";
import cors from "cors";
import express from "express";
import orderRoute from "./routes/order.route.js";
import productRoute from "./routes/product.routes.js";
import userRoute from "./routes/user.route.js";
import multer from "multer";
import connectCloudinary from "./config/cloudinary.js";
import uploadFile from "./utils/fileUploader.js";
import cartRoute from "./routes/cart.route.js";
const app = express();

connectDb();
connectCloudinary();

const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    name: "E-Commerce API",
    version: "1.0.0",
    status: "OK",
    message: "Welcome to the E-Commerce API",
  });
});

app.use("/api/user", upload.single("image"), userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product/", upload.array("images", 5), productRoute);
app.use("/api/order/", orderRoute);
app.use("/api/cart/", cartRoute);

app.listen(config.port, () => {
  console.log(`server is running .... at port: ${config.port}`);
});
