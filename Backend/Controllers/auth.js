const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/config");

//sign-up
const handleUserSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //missing fields check
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    //email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered!" });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(String(password), 10); //10 is the saltRounds

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.error("Error in user sign-up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//login
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check for missing fields
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    //check if user exist or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    //compare plain & hashed password
    const isPasswordMatched = await bcrypt.compare(
      String(password),
      existingUser.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }
    
    //storing the userID
    const userID = existingUser._id;

    //valid user -> genearte jwt
    const token = jwt.sign({ id: User._id, email: User.email }, jwtSecretKey, {
      expiresIn: "12h",
    });
    return res.status(200).json({ message: "User Login Successful", token, userID });
  } catch (err) {
    console.error("Error in user sign-up", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleUserSignUp,
  handleUserLogin
};