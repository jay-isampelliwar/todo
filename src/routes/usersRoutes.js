const express = require("express");
const validateToken = require("./../middleware/tokenValidator");
const route = express.Router();
const {
  userDetails,
  loginUser,
  createUser,
  forgetPassword,
} = require("./../controller/userController");
route.post("/register", createUser);
route.post("/login", loginUser);
route.post("/forget_password", forgetPassword);
route.get("/", validateToken, userDetails);

module.exports = route;
