const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("./../models/userModel");
const otpSender = require("./../helper/mailSender");
const randomOtp = require("./../helper/randomOTP");
const OTP = require("./../models/otpModel");
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

    res.json({
      status: true,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const userDetails = asyncHandler(async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    res.status(404).json({
      status: false,
      message: "User Details",
      data: null,
    });
  }
  res.json({
    status: true,
    message: "User Details",
    data: {
      status: true,
      username: user.username,
      phone: user.phone,
      email: user.email,
    },
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
  await newUser.save();
  const otp = randomOtp();
  const newOTP = new OTP({
    user_id: newUser.id,
    otp: otp,
  });

  await newOTP.save();
  await otpSender.otpSender(email, otp);

  res.status(201).json({
    status: true,
    message: "Please Verify OTP",
  });
});

const verifyUserOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user = await OTP.findOne({ otp: otp });

  if (!user) {
    res.status(404);
    throw new Error("Wrong OTP");
  }

  if (user.otp === otp) {
    await OTP.deleteOne({ otp: otp });
    res.json({
      status: true,
      message: "OTP Verified",
    });
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    res.status(400);
    throw new Error("Phone Number not found");
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
    status: true,
    message: "Password is updated please Login with new password",
  });
});

module.exports = {
  userDetails,
  loginUser,
  createUser,
  forgetPassword,
  verifyUserOTP,
};
