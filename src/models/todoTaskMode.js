const { Schema, model } = require("mongoose");

const todoTaskModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
    startTime: {
      type: Date,
      default: new Date().getTime(),
    },
    endTime: {
      type: Date,
      default: new Date().getTime(),
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("TodoTask", todoTaskModel);
