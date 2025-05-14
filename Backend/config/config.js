require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGODB_URL;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const groqApiKey = process.env.GROQ_API_KEY;
const cloudName = process.env.CLOUD_NAME;
const cloudAPIKey = process.env.CLOUD_API_KEY;
const cloudAPISecret = process.env.CLOUD_API_SECRET;

if (!mongoURL) {
  console.error("MongoDB URL is missing in environment variables.");
  process.exit(1);
}

module.exports = {
  port,
  mongoURL,
  jwtSecretKey,
  groqApiKey,
  cloudName,
  cloudAPIKey,
  cloudAPISecret,
};