require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const app = express();
const httpServer = createServer(app);
const { initializeSocket } = require("./socket");
initializeSocket(httpServer);

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
const adminUserRoutes = require("./routes/admin");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/atoms", atomsRoutes);
app.use("/api/admin", adminUserRoutes);
db.sequelize.sync().then(() => {
  httpServer.listen(5000, () => {
    console.log("server is running on port 5000");
  });
});
