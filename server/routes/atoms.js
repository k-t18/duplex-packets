const express = require("express");
const router = express.Router();
const { Atoms } = require("../models");
const checkUserSession = require("../utils/checkUserSession");
const isAdminUser = require("../utils/isAdminUser");

router.post("/new", isAdminUser, async (req, res) => {
  const { atomicNumber, atomicMass, symbol, name } = req.body;
  if ((atomicNumber, atomicMass, symbol, name)) {
    const createAtom = await Atoms.create({
      atomicNumber,
      atomicMass,
      symbol,
      name,
    });
  } else {
    res.status(400).send({ message: "Please provide all the details" });
  }

  res.status(200).send({ message: "Atom created successfully" });
});

router.get("/", checkUserSession, async (req, res) => {
  try {
    const atomsList = await Atoms.findAll();
    res.status(200).send({ message: atomsList });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
