const mongoose = require("mongoose");
const User = require("./User");
const Character = require("./Character");

const conversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  character: {
    type: mongoose.Schema.ObjectId,
    ref: Character,
  },
  messages: [
    {
      role: {
        type: String,
        enum: ["system", "user", "assistant"],
      },
      content: {
        type: String,
      },
    },
  ],
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema)

module.exports = Conversation