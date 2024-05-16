const express = require("express");
const app = express();
require("dotenv").config();
const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize("db_test", "root", "lostinloops", {
//   host: "localhost", // Replace with your database host if it's not localhost
//   dialect: "mysql", // Or 'postgres', 'sqlite', etc., depending on your database
//   port: 3308, // Replace with your database port if it's not the default
// });
const db = require("./models");

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.get("/db-health", async (req, res) => {
//   try {
//     await sequelize.authenticate();
//     res.status(200).send("Database connection established successfully.");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Failed to connect to the database.");
//   }
// });
db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("server is running on port 5000");
  });
});
