const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Exercise = require('../models/exercise');

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name
    });
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const u = await User.findByIdAndDelete(req.params.id);
    const e = await Exercise.deleteMany({ user: req.params.id });
    res.json({ user: u, exercises: e });
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
