const mongoose = require("mongoose");

const connectToMongoDB = async (url) => {
  try {
    if (!url) {
      process.exit(1);
    }
    await mongoose.connect(url);
    console.log("MongoDB successfully connected");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;