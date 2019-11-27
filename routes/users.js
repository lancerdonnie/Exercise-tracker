const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res, json({ msg: error.message });
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
module.exports = router;
