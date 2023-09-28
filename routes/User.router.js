const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userWithUsername = await User.findOne({ username });
  if (userWithUsername) {
    if (userWithUsername.username === username) {
      return res.status(400).json({
        error: 'Username already taken',
      });
    }
  }

  const userWithEmail = await User.findOne({ email });
  if (userWithEmail) {
    if (userWithEmail.email === email) {
      return res.status(400).json({
        error: 'Email already taken',
      });
    }
  }

  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({
    data: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

router.get('/login', (req, res) => {
  res.status(200).json({
    message: 'Login',
  });
});

module.exports = router;
