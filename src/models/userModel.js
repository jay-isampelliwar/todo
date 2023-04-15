const { Schema, model } = require("mongoose");

const userModel = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add Contact name"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add Contact email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add Contact phone"],
    },
    verification: {
      type: String,
      enum: ["Not Verified", "Pending", "Verified"],
      default: "Not Verified",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userModel);
