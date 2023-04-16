const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("./../models/userModel");
const otpSender = require("./../helper/mailSender");
const randomOtp = require("./../helper/randomOTP");
const OTP = require("./../models/otpModel");
const jwt = require("jsonwebtoken");

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "You don't have account",
      token: null,
    });
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

    return res.json({
      status: true,
      message: "Token",
      token,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "Invalid Credentials",
      token: null,
    });
  }
});

const userDetails = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email);
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User Details",
      data: null,
    });
  }
  return res.json({
    status: true,
    message: "User Details",
    data: {
      status: true,
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
  });
});

const createUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400);
    throw new Error("You already have an account");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    phone,
    email,
    password: hashedPass,
  };

  const otp = randomOtp();

  const newOTP = new OTP({
    otp: otp,
    email,
    newUser,
  });

  newOTP.save();
  await otpSender.otpSender(email, otp);

  return res.status(201).json({
    status: true,
    message: "Please Verify OTP",
  });
});

const verifyUserOTP = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;
  const otpModel = await OTP.findOne({ email: email });

  if (!otpModel) {
    res.status(404);
    throw new Error("Invalid Email");
  }
  if (otpModel.otp === otp) {
    await OTP.deleteOne({ email: email });

    const user = new User({
      email: otpModel.newUser.email,
      phone: otpModel.newUser.phone,
      password: otpModel.newUser.password,
      name: otpModel.newUser.name,
      verification: "Verified",
    });

    user.save();

    return res.json({
      status: true,
      message: "OTP Verified",
    });
  } else {
    res.status(400);
    throw new Error("Wrong OTP");
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const hashedPass = await bcrypt.hash(req.body.newPassword, 10);
  const newDetails = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    password: hashedPass,
  };
  await User.updateOne({ email: req.body.email }, newDetails, { new: true });

  return res.json({
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
