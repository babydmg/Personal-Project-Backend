const { Schema, model } = require('mongoose');

const ChatModel = new Schema(
  {
    recieverID: {
      type: String,
      required: true,
    },
    senderID: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('chats', ChatModel);
