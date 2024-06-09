const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { getIo } = require("../socket");

router.get("/active-users", async (req, res) => {
  const activeUsers = await Users.findAll({
    where: { isActive: true },
    attributes: ["id", "firstName", "email", "role"],
  });
  res.status(200).json({ message: activeUsers });
});
module.exports = router;
