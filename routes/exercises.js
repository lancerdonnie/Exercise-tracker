const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise');

router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.find({ user: req.params.id });
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

router.delete('/:id', async (req, res) => {
  try {
    const res = await Exercise.findByIdAndDelete(req.params.id);
    res.json(res);
  } catch (error) {
    res.json(error);
  }
});
router.patch('/:id', async (req, res) => {
  const exercise = {};
  if (req.body.exercise) exercise.exercise = req.body.exercise;
  if (req.body.duration) exercise.duration = req.body.duration;

  try {
    const res = await Exercise.findByIdAndUpdate(req.params.id, exercise);
    res.json(res);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
