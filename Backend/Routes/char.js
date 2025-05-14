const express = require("express");
const {
  handleAddCharacter,
  handleDeleteCharacter,
  handleUpdateCharacter,
  handleGetCharacter,
  handleGetCharacterById,
} = require("../Controllers/character");
const charRouter = express.Router();

charRouter.get("/getCharacter", handleGetCharacter)
charRouter.get("/getCharacter/:id", handleGetCharacterById)
charRouter.post("/addCharacter", handleAddCharacter);
charRouter.delete("/deleteCharacter/:id", handleDeleteCharacter);
charRouter.put("/updateCharacter/:id", handleUpdateCharacter)

module.exports = charRouter;