import User from "../models/Users.js";

const createUser = async (data) => {
  return await User.create(data);
};

export default { createUser };
