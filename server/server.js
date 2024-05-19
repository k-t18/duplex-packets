const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

const db = require("./models");
const authRoutes = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("server is running on port 5000");
  });
});
