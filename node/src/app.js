import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDb from "./config/database.js";
import express from "express";

import userRoute from "./routes/user.route.js";

const app = express();

connectDb();

app.use(bodyParser.json());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(config.port, () => {
  console.log(`server is running .... at port: ${config.port}`);
});
