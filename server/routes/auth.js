const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");

function generateRandomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }

  return result;
}

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, role } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user
    const encryptedPassword = await bcrypt.hash(password, 8);
    const newUser = await Users.create({
      email,
      password: encryptedPassword,
      firstName,
      role,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await Users.findOne({ where: { email } });
    if (!userData) {
      return res
        .status(404)
        .send({ message: "Please register yourself first!" });
    }
    const matchPassword = await bcrypt.compare(password, userData.password);
    if (!matchPassword) {
      return res.status(401).send({ message: "Incorrect Password" });
    }
    res.cookie("sid", generateRandomString(64), {
      maxAge: 900000,
      httpOnly: true,
    });
    res.cookie("user", { email: userData.email, userName: userData.firstName });
    return res.status(200).send({ message: "Logged In" });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({
      message: "Couldn't log you in right now! Please try back in sometime.",
    });
  }
});

router.get("/get-cookie", (req, res) => {
  res.send(req.cookies);
});

module.exports = router;
