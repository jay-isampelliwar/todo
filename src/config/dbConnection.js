const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = mongoose.connect(
      "mongodb+srv://jayisampelliwar:Jay112233@cluster1.6g97czu.mongodb.net/TODO_DB"
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
