const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, role } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = await Users.create({ email, password, firstName, role });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
