require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const app = express();
const httpServer = createServer(app);
const { initializeSocket } = require("./socket");
initializeSocket(httpServer);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
//   cookie: true,
// });

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const db = require("./models");
const authRoutes = require("./routes/auth");
const atomsRoutes = require("./routes/atoms");
const { Atoms } = require("./models");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/atoms", atomsRoutes);

// io.on("connection", (socket) => {
//   console.log("websocket connected", socket.handshake.headers);
//   console.log("io", io);
// });
// module.exports = io;

db.sequelize.sync().then(() => {
  httpServer.listen(5000, () => {
    console.log("server is running on port 5000");
  });
});
