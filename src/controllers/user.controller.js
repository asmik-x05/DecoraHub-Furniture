import userService from "../services/user.service.js";

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await userService.getUsers();
    res.send(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};
const updateProfile = async (req, res) => {
  try {
    const data = await userService.updateProfile(req.file, req.user._id);

    res.status(200).send(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

export default { createUser, getUsers, updateProfile };
