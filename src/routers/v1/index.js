// Router V1
const express = require("express");
const userController = require("../../controllers/users.controller");
const restaurantController = require("../../controllers/restaurant.controller");
const authController = require("../../controllers/auth.controller");
// const userRouter = require("./users.router");
const v1 = express.Router();

// path: /api/v1

// v1.use("/users", userRouter);

// Định nghĩa các router cho users
v1.get("/users", userController.getUser());
v1.post("/users", userController.createUser());
v1.delete("/users/:id", userController.deleteUser());
v1.put("/users/:id", userController.updateUser());

// Định nghĩa các router cho Restaurant
v1.get("/restaurants", restaurantController.getRestaurants());
v1.post(
  "/restaurants/:restaurantId/like",
  restaurantController.likeRestaurant()
);

// Định nghĩa các router cho Auth
v1.post("/login", authController.login());
module.exports = v1;
