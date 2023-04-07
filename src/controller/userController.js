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
    throw new Error("You alreday have an account");
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

module.exports = { userDetails, loginUser, createUser };
