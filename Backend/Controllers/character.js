const Character = require("../Models/Character");

//get all characters
const handleGetCharacter = async (req, res) => {
  try {
    const characters = await Character.find();

    return res
      .status(200)
      .json({ message: "characters fetched successfully", characters });
  } catch (err) {
    console.error("Error in user sign-up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//get character by id
const handleGetCharacterById = async (req, res) => {
  try {
    const characterId = req.params.id;

    if (!characterId) {
      return res
        .status(400)
        .json({ error: "Character ID is requried, check URL" });
    }
    const character = await Character.findById({ _id: characterId });
    return res
      .status(200)
      .json({ message: "characters fetched successfully", character });
  } catch (err) {
    console.error("Error in user sign-up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//add new character
const handleAddCharacter = async (req, res) => {
  try {
    const {
      name,
      owner,
      avatarURL,
      personalityTrait,
      description,
      style: { tone, length, temperature },
    } = req.body;

    //fields validation
    if (
      !name ||
      !personalityTrait ||
      personalityTrait.length === 0 ||
      !description ||
      !tone ||
      !length ||
      !temperature
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const defaultAvatar = 'https://res.cloudinary.com/dnywlroea/image/upload/v1746977671/defaultAvatar_botz1t.png'

    //value typecast
    const temp = Number(temperature);
    const lth = Number(length);

    await Character.create({
      name,
      owner,
      personalityTrait,
      description,
      avatarURL: avatarURL? avatarURL : defaultAvatar,
      style: {
        tone,
        length: lth,
        temperature: temp,
      },
    });

    return res.status(201).json({ message: "Character created successfully" });
  } catch (err) {
    console.error("Error in user sign-up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//update existing character
const handleUpdateCharacter = async (req, res) => {
  try {
    const {
      name,
      personalityTrait,
      description,
      style: { tone, length, temperature },
    } = req.body;

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Character ID is required!" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    if (Array.isArray(personalityTrait) && personalityTrait.length > 0) {
      updateData.personalityTrait = personalityTrait;
    }

    const style = {};
    if (tone) style.tone = tone;
    if (length) style.length = Number(length);
    if (temperature) style.temperature = Number(temperature);
    if (Object.keys(style).length > 0) updateData.style = style;

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ error: "Atleast one field is required to update!" });
    }

    const updatedCharacter = await Character.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCharacter) {
      return res.status(404).json({ error: "Character not found" });
    }

    return res
      .status(200)
      .json({ message: "Character updated", updatedCharacter });
  } catch (err) {
    console.error("Error in user sign-up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete character
const handleDeleteCharacter = async (req, res) => {
  try {
    const characterId = req.params.id;

    if (!characterId) {
      return res
        .status(400)
        .json({ error: "Character ID is requried, check URL" });
    }

    await Character.findByIdAndDelete({ _id: characterId });
    return res.status(200).json({ message: "Character successfully deleted" });
  } catch (err) {
    console.error("Error in user sign-up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleGetCharacter,
  handleGetCharacterById,
  handleAddCharacter,
  handleDeleteCharacter,
  handleUpdateCharacter,
};