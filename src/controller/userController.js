const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const loginUser = asyncHandler(async (req, res) => {});
const userDetails = asyncHandler(async (req, res) => {});
const createUser = asyncHandler(async (req, res) => {});

module.exports = { userDetails, loginUser, createUser };
