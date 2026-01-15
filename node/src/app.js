import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDb from "./config/database.js";
import express from "express";
import productRoute from "./routes/product.routes.js";
import userRoute from "./routes/user.route.js";

connectDb();

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product/", productRoute);

app.listen(config.port, () => {
  console.log(`server is running .... at port: ${config.port}`);
});
