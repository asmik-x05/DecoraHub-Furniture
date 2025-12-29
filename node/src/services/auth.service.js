import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createJWT } from "../utils/jwt.js";
const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  if (!user)
    throw {
      status: 404,
      message: "user not found",
    };
  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordMatch)
    throw {
      status: 400,
      message: "incorrect email or password",
    };

  return {
    _id: user._id,
    Name: user.name,
    Email: user.email,
    Phone: user.phone,
    Address: user.address,
    Role: user.roles,
    isActive: user.isActive,
  };
};
const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  if (user)
    throw {
      status: 409,
      message: "user already exists",
    };
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(data.password, salt);
  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    password: hashedPassword,
  });
  return {
    _id: createdUser._id,
    Name: createdUser.name,
    Email: createdUser.email,
    Phone: createdUser.phone,
    Address: createdUser.address,
    Role: createdUser.roles,
    isActive: createdUser.isActive,
  };
};

const forgetPassoword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 400, message: "user not found." };
  const token = crypto.randomUUID();
};

const resetPassword = async (userId, token, password) => {
  
};
export default { login, register, forgetPassoword };
