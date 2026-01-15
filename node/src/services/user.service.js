import User from "../models/Users.js";

const createUser = async (data) => {
  return await User.create(data);
};

const getUsers = async () => {
  const data = await User.find();

  return data;
};

export default { createUser, getUsers };
