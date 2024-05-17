const express = require("express");
const app = express();
require("dotenv").config();

const db = require("./models");

app.get("/", (req, res) => {
  res.send("Hello World");
});

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("server is running on port 5000");
  });
});
