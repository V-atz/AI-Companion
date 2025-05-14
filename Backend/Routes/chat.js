const express = require("express");
const {
  handleSendChat,
  handleDeleteChat,
  handleGetUserChats,
  handleGetUserCharacterChat,
} = require("../Controllers/chat");
const chatRouter = express.Router();

chatRouter.post("/user/:userId/char/:characterId", handleSendChat);
chatRouter.get("/user/:userId/char/:characterId", handleGetUserCharacterChat);
chatRouter.delete("/chat/:id", handleDeleteChat);
chatRouter.get("/user/:id/chats", handleGetUserChats);

module.exports = chatRouter;