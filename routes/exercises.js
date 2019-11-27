const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise');

router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.find({ user: req.params.id });
    // const exercise = await Exercise.find();
    res.json(exercise);
  } catch (error) {
    res.json(error);
  }
});

router.post('/:id', async (req, res) => {
  const exercise = Exercise({
    user: req.params.id,
    exercise: req.body.exercise,
    duration: req.body.duration
  });
  try {
    const newExercise = await exercise.save();
    res.json(newExercise);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
