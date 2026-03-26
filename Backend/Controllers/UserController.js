const userModel = require("../Models/userModel");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await userModel.createUser(username, email, password);
    res.status(201).json({ message: "User registered successfully" });
  } 
  catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};