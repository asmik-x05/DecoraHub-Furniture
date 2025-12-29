import dotenv from "dotenv";

dotenv.config();
const config = {
  name: process.env.NAME || "",
  port: process.env.PORT || 5000,
  version: process.env.VERSION || "1.0.1",
  mongodburl: process.env.MONGODB_URL || "",
  jwtsecret: process.env.JWT_SECRET || "KEY",
};
export default config;
