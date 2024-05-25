// socket.js
const { Server } = require("socket.io");
let io;

const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
    cookie: true,
  });

  io.on("connection", (socket) => {
    socket.emit("connection", "You are connected to the socket");
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIo };
