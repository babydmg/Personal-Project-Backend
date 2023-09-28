const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      error: 'User not founded',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      error: 'Wrong Password',
    });
  }

  res.status(200).json({
    data: jwt.sign(
      {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET
    ),
  });
});

module.exports = router;
