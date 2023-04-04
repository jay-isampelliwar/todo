const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = mongoose.connect(process.env.CONNECTION_STRING);
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
