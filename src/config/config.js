import dotenv from "dotenv";

dotenv.config();

const config = {
  name: process.env.NAME || "",
  port: process.env.PORT || 5000,
  version: process.env.VERSION || "1.0.1",
  mongodburl: process.env.MONGODB_URL || "",
  jwtsecret: process.env.JWT_SECRET || "KEY",
  appUrl: process.env.APP_URL || "",
  khalti: {
    apiurl: process.env.KHALTI_URL || "",
    secret: process.env.KHALTI_SECRET_KEY || "",
  },
  emailApiKey: process.env.EMAIL_API_KEY || "",
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
  },
  geminiApiKey: process.env.GEMINI_API_KEY || "",
};

export default config;
