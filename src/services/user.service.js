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
    { new: true }
  );
};

export default { createUser, getUsers,updateProfile };
