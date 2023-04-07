const { Schema, model } = require("mongoose");

const todoTaskModel = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    // startDate: {
    //   type: Date,
    //   default: Date.now,
    // },
    // endDate: {
    //   type: Date,
    //   default: Date.now,
    // },
    // startTime: {
    //   type: Date,
    //   default: new Date().getTime(),
    // },
    // endTime: {
    //   type: Date,
    //   default: new Date().getTime(),
    // },
    isDone: {
      type: Boolean,
      default: false,
    },
  }
  // { timestamps: true }
);

module.exports = model("TodoTask", todoTaskModel);
