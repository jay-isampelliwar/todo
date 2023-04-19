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
  },
  { timestamps: true }
);

module.exports = model("TodoTask", todoTaskModel);
