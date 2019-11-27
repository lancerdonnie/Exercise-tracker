require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('Database Connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
