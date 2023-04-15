const { Schema, model } = require("mongoose");

const otpModel = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

module.exports = model("OTP", otpModel);
