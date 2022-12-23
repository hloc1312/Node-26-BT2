// const userService = require("../services/users.service");

// const getUser = async (req, res) => {
//   try {
//     const users = await userService.getUsers();
//     res.status(200).json({ data: users });
//   } catch (error) {
//     res.status(400).json({ error: error });
//   }
// };

// Controller nhận vào request và response
//  Nhiệm vụ: chỉ parse request (param, body) sau đó chuyển xuống Service xử lý, nhận kết quả trả về từ Service và trả response cho client.

const { response } = require("../helpers/response");
const User = require("../models/User");
const userService = require("../services/users.service");

const getUser = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUser();
      res.status(200).json(response(users));
    } catch (error) {
      // res.status(500).json({ error: error });
      // Chuyển tiếp cái error xuống middleware handleErrors
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const user = req.body;
      const createUser = await userService.createUser(user);
      res.status(200).json(response(createUser));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(200).json(response(true));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updateUser = await userService.updateUser(data, id);
      res.status(200).json(response(updateUser));
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };
};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
