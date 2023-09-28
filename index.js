const express = require('express');
const user = require('./routes/User.router');
const dbConnect = require('./dbConnect');
require('dotenv').config();

const app = express();

dbConnect();

app.use('/auth', user);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello, World!',
  });
});

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => console.log('Server is running'));
