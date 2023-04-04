const express = require("express");
const route = express.Router();
const {
  userDetails,
  loginUser,
  createUser,
} = require("./../controller/userController");
route.post("/register", createUser);
route.post("/login", loginUser);
route.get("/user", userDetails);

module.exports = route;
