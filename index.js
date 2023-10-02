const express = require('express');
const user = require('./routes/User.router');
const chat = require('./routes/Chat.router');
const dbConnect = require('./dbConnect');
const authenticateToken = require('./middlewares/authenticateToken');
require('dotenv').config();

const app = express();

dbConnect();

app.use(express.json());

app.use('/auth', user);
app.use('/chat', chat);

const chats = [
  {
    username: 'jonny.green',
    chat: 'Hello',
  },
  {
    username: 'sam33',
    chat: 'Hi',
  },
];

app.get('/', authenticateToken, (req, res) => {
  const userChats = chats.filter((chat) => chat.username == req.user.username);
  res.status(200).json({
    chats: userChats,
  });
});

const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => console.log('Server is running'));
