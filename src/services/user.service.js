import User from "../models/Users.js";
import uploadFile from "../utils/fileUploader.js";

const createUser = async (data) => {
  return await User.create(data);
};

const getUsers = async () => {
  const data = await User.find();

  return data;
};
const updateProfile = async (file, id) => {
  const uploadedFile = await uploadFile([file]);

  return await User.findByIdAndUpdate(
    id,
    {
      profileImgUrl: uploadedFile[0].url,
    },
    { new: true },
  );
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user)
    throw {
      status: 404,
      message: "User not found.",
    };

  return user;
};

const updateUser = async (id, data, authUser) => {
  if (authUser._id !== id && !authUser.roles.includes(ROLE_ADMIN))
    throw {
      status: 403,
      message: "Access denied.",
    };

  return await User.findByIdAndUpdate(
    id,
    {
      name: data?.name,
      address: data?.address,
      phone: data?.phone,
      isActive: data?.isActive,
    },
    { new: true },
  );
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);

  return "User deleted successfully.";
};

const updateUserRoles = async (id, roles) => {
  return await User.findByIdAndUpdate(id, { roles }, { new: true });
};

export default { createUser, getUsers, updateProfile, getUserById, updateUser, deleteUser, updateUserRoles };