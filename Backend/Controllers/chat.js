const axios = require("axios");
const Groq = require("groq-sdk");
const { groqApiKey } = require("../config/config");
const getGroqChatCompletion = require("../Controllers/groq");
const groq = new Groq({ apiKey: groqApiKey });
const Conversation = require("../Models/Conversation");
const Character = require("../Models/Character");

//add new chat
const handleSendChat = async (req, res) => {
  try {
    const { userMessage } = req.body;
    const { characterId, userId } = req.params;

    console.log(characterId);

    //check for empty message
    if (!userMessage) {
      return res.status(400).json({ error: "Message can't be empty" });
    }

    //finding character details from database through ID
    const characterData = await Character.findById({ _id: characterId });
    if (!characterData) {
      return res.status(404).json({ error: "Character not found" });
    }

    //genearting prompt of character & passing it to this chat
    console.log(characterData);

    let traitList = characterData.personalityTrait.join(", ");

    //character prompt
    const characterPrompt = `
    You are ${characterData.name}, a character with this description: ${characterData.description}. Your tone should be ${characterData.style.tone}, and you should respond with a maximum of ${characterData.style.length} lines. Some of your key personality traits include: ${traitList}. Speak with confidence, wisdom, and in a manner fitting of your character. Maintain the essence of your persona in all replies. Always stay in character—respond as a real person would, not like an AI or chatbot. Use natural, expressive language that fits your persona, and make sure your replies feel authentic and alive. Speak respectfully and avoid content that could be harmful, offensive, or discriminatory. Maintain the spirit of your character without encouraging or glorifying violence, hate, or unsafe behavior. Your purpose is to enrich the experience, not to shock or harm.
    `;

    console.log(characterPrompt);

    //find old conversation to build memory
    //we can give filter with character/userID to get a particular convo
    let conversation = await Conversation.findOne({
      character: characterId,
      user: userId,
    });

    if (!conversation) {
      conversation = new Conversation({
        character: characterId,
        user: userId,
        messages: [],
      });
    }

    if (!conversation.messages) {
      conversation.messages = [];
    }

    //sending character prompt to character-database
    if (conversation.messages.length === 0) {
      conversation.messages.push({
        role: "system",
        content: characterPrompt,
      });
    }

    //message sent through user input
    const newUserMessage = {
      role: "user",
      content: userMessage,
    };

    //adding user message to the Database
    conversation.messages.push(newUserMessage);

    //send user message + old messages to the GROQ API input

    //seperating systemMessage(prompt) & dialogueMessages(userMessage & AI response)
    const systemMessage = conversation.messages.find(
      (i) => i.role === "system"
    );
    const dialogueMessages = conversation.messages.filter(
      (i) => i.role !== "system"
    );

    //limiting the messages length to 30
    const recentMessages = dialogueMessages.slice(-30);

    //combine (system + recentMessages) so, system prompt stays & we fetch only recent 30 messages
    const finalMessages = [systemMessage, ...recentMessages];

    const formattedMessages = finalMessages
      .map((i) => `${i.role}: ${i.content}`)
      .join("\n");
    console.log(formattedMessages);

    //GROQ API call
    const chatCompletion = await getGroqChatCompletion(formattedMessages);

    //fetching the assistant reply from GROQ API response
    const assistantReply = {
      role: "assistant",
      content: chatCompletion?.choices[0]?.message?.content || "No response",
    };

    //adding assistant reply to the Database
    conversation.messages.push(assistantReply);

    //saving the entire convo (userMessage + Assistant reply)
    await conversation.save();

    res.json({
      assistantMessage: assistantReply.content || "No response",
    });
  } catch (err) {
    console.error("Error connecting with GROQ-API", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//get chat by userID
const handleGetUserChats = async (req, res) => {
  try {
    const userID = req.params.id;

    //check for userID
    if (!userID) {
      return res.status(400).json({ error: "This userID doesn't exist" });
    }

    const chats = await Conversation.find({ user: userID }).populate('character').sort({updatedAt: -1});

    return res
      .status(200)
      .json({ message: "All chats fetched successfully", chats });
  } catch (err) {
    console.error("Error fetching chats of user", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetUserCharacterChat = async (req, res) => {
  try {
    const { characterId, userId } = req.params;

    //check for parameters
    if (!characterId || !userId) {
      return res
        .status(400)
        .json({ error: "Character ID or user ID does not exist" });
    }

    const convo = await Conversation.find({
      character: characterId,
      user: userId,
    }).populate('character');

    return res
      .status(200)
      .json({ message: "Conversation fetched successfully", convo });
  } catch (err) {
    console.error("Error fetching chats of user", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete chat
const handleDeleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;

    //check for empty message
    if (!chatId) {
      return res.status(400).json({ error: "Character ID isn't existing" });
    }

    //finding character details from database through ID
    await Conversation.findByIdAndDelete({ _id: chatId });

    return res.status(200).json({ message: "Chat deleted successfully!" });
  } catch (err) {
    console.error("Error deleting the chat", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleSendChat,
  handleGetUserChats,
  handleGetUserCharacterChat,
  handleDeleteChat,
};