const express = require('express');
const Chat = require('../models/Chat.model.js');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/send', authenticateToken, async (req, res) => {
  const chatDetails = {
    senderID: req.user._id,
    recieverID: req.body.ruid,
    text: req.body.text,
  };

  const newChat = new Chat(chatDetails);

  await newChat.save();

  res.status(200).json({
    chat: newChat,
  });
});

router.get('/chats', authenticateToken, async (req, res) => {
  const allChats = await Chat.find({ senderID: req.user._id });

  res.status(200).json({
    chats: allChats,
  });
});

module.exports = router;
