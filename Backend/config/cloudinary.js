const cloudinary = require("cloudinary").v2;
const { cloudName, cloudAPIKey, cloudAPISecret } = require("./config");

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudAPIKey,
  api_secret: cloudAPISecret,
});

module.exports = cloudinary;