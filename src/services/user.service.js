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
  if (authUser._id !== id && !authUser.Role.includes(ROLE_ADMIN))
    throw {
      status: 403,
      message: "Access denied.",
    };

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name: data?.name,
      address: data?.address,
      phone: data?.phone,
      isActive: data?.isActive,
    },
    { new: true },
  );

  return {
    _id: updatedUser._id,
    Name: updatedUser.name,
    Email: updatedUser.email,
    Phone: updatedUser.phone,
    Address: updatedUser.address,
    Role: updatedUser.roles,
    isActive: updatedUser.isActive,
  };
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);

  return "User deleted successfully.";
};

const updateUserRoles = async (id, roles) => {
  return await User.findByIdAndUpdate(id, { roles }, { new: true });
};

export default { createUser, getUsers, updateProfile, getUserById, updateUser, deleteUser, updateUserRoles };