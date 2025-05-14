const mongoose = require("mongoose");
const User = require("./User")

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      enum: ["pre-built", "user", "role-play"],
      required: true,
    },
    // userId: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: User,
    //   default: null,
    // },
    personalityTrait: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    style: {
      tone: {
        type: String,
        required: true,
      },
      length: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
      temperature: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
      },
    },
  },
  { timestamps: true }
);

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;