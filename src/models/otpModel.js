const { Schema, model } = require("mongoose");

const otpModel = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  newUser: {
    type: Object,
    ref: "User",
  },
});

module.exports = model("OTP", otpModel);
