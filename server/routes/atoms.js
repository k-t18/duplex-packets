const express = require("express");
const router = express.Router();
const { Atoms } = require("../models");
const checkUserSession = require("../utils/checkUserSession");
const isAdminUser = require("../utils/isAdminUser");
const { getIo } = require("../socket");

router.post("/new", isAdminUser, async (req, res) => {
  console.log(req.body);
  const { atomicNumber, atomicMass, symbol, name } = req.body;
  if (atomicNumber && atomicMass && symbol && name) {
    const createAtom = await Atoms.create({
      atomicNumber,
      atomicMass,
      symbol,
      name,
    });
    const ioFunc = getIo();
    const atomsList = await Atoms.findAll();
    ioFunc.emit("get-atoms-list", atomsList);
    return res.status(200).send({ message: "Atom created successfully" });
  } else {
    return res.status(400).send({ message: "Please provide all the details" });
  }
});

router.get("/", checkUserSession, async (req, res) => {
  try {
    const atomsList = await Atoms.findAll();
    return res.status(200).send({ message: atomsList });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
