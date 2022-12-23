// User Router
const express = require("express");
const { getUser } = require("../../controllers/users.controller");
// path: /api/v1/users
const userRouter = express.Router();

userRouter.get("", getUser);
module.exports = userRouter;
