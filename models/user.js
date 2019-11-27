const mongoose = require('mongoose');

const user = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});
const User = mongoose.model('excercise-tracker-user', user);
module.exports = User;
