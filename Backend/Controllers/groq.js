const Groq = require("groq-sdk");
const {groqApiKey} = require("../config/config");

const groq = new Groq({ apiKey: groqApiKey });

const getGroqChatCompletion = async (userMessage) => {
  return groq.chat.completions.create({
    messages: [{ role: "user", content: userMessage }],
    model: "llama-3.3-70b-versatile",
  });
};

module.exports = getGroqChatCompletion;