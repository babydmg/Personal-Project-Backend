const express = require('express');

const router = express.Router();

router.get('/register', (req, res) => {
  res.status(200).json({
    message: 'Register',
  });
});

router.get('/login', (req, res) => {
  res.status(200).json({
    message: 'Login',
  });
});

module.exports = router;
