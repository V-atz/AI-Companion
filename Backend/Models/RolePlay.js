const mongoose = require("mongoose");
const User = require("./User");

const rolePlaySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },
    scene: {
      type: String,
      enum: ["hogwartExpress", "avengers2012"], 
      required: true,  
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
  },
  { timestamps: true }
);

const RolePlay = mongoose.model("RolePlay", rolePlaySchema)

module.exports = RolePlay