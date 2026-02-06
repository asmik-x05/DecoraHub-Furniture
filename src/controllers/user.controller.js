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
const getUserById = async (req, res) => {
  try {
    const data = await userService.getUserById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(
      req.params.id,
      req.body,
      req.user,
    );

    const token = createJWT(data);
    res.cookie("authToken", token, { maxAge: 86400 * 1000 });
    res.json({ ...data, token });
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const data = await userService.getUserById(req.user._id);

    res.json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const updateUserRoles = async (req, res) => {
  try {
    const data = await userService.updateUserRoles(
      req.params.id,
      req.body.roles,
    );

    res.json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

export default {
  createUser,
  getUsers,
  updateProfile,
  getUserById,
  updateUser,
  deleteUser,
  getLoggedInUser,
  updateUserRoles,
};
