const authService = require("../services/auth.service");
const { response } = require("../helpers/response");
const login = () => {
  return async (req, res, next) => {
    try {
      const credentials = req.body;
      const user = await authService.login(credentials);
      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  login,
};
