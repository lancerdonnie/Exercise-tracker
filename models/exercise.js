const mongoose = require('mongoose');

const Exercise = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'excercise-tracker-user'
  },
  exercise: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('excercise-tracker-exercise', Exercise);
