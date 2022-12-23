const bcrypt = require("bcrypt");
const { User } = require("../models");
const { AppError } = require("../helpers/error");
const login = async (credentials) => {
  try {
    const { email, password } = credentials;
    const user = await User.findOne({
      where: { email },
      attributes: { include: ["password"] },
    });

    if (!user) {
      throw new AppError(400, "Email or Password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
      throw new AppError(400, "Email or Password invalid");
    }

    delete user.dataValues.password;
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = { login };
