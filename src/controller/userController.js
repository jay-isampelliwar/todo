const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          username: user.username,
          phone: user.phone,
          email: user.email,
          id: user.id,
        },
      },
      process.env.TOKEN_KEY,
      { expiresIn: "30m" }
    );

    res.json({ token });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const userDetails = asyncHandler(async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({
    username: user.username,
    phone: user.phone,
    email: user.email,
  });
});

const createUser = asyncHandler(async (req, res) => {
  const { username, phone, email, password } = req.body;

  const user = await User.findOne({ phone: phone });
  if (user) {
    res.status(400);
    throw new Error("You already have an account");
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    phone,
    email,
    password: hashedPass,
  });

  newUser.save();
  res.json({
    username,
    phone,
    email,
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    res.status(404);
    throw new Error("Phone Number is wrong");
  }

  const hashedPass = await bcrypt.hash(req.body.newPassword, 10);
  const newDetails = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    password: hashedPass,
  };
  await User.updateOne({ phone: req.body.phone }, newDetails, { new: true });

  res.json({
    username: user.username,
    phone: user.phone,
    email: user.email,
  });
});

module.exports = { userDetails, loginUser, createUser, forgetPassword };
