require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.DB_URI;

const connectDB = () => {
  try {
    const options = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(uri, options, (err) => {
      if (err) return console.log(err);
      console.log("DB Connected");
    });
  } catch (error) {
    console.log(error);
    console.log(error);
  }
};

module.exports = connectDB;
