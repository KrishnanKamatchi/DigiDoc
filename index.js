const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const ioServer = new Server(server, {
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {
    maxInterval: 10000,
    minReconnectionDelay: 5000,
  },
});

const middleware = require("./middleware");
const dataInit = require("./database")();

const mainServer = async () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(middleware);
  app.use(express.static(path.join(__dirname, "views")));

  const userController = require("./controllers/users")(dataInit.db);
  const documentsController = require("./controllers/documents")(dataInit.db);

  const routes = require("./routes/users")(userController);
  app.use("/users", routes.route());

  ioServer.on("connection", async (socket) => {
    socket.on("message", (msg) => {
      documentsController.create(msg.name, msg.version, msg.content);
      socket.broadcast.emit("message", msg);
    });

    socket.on("user", (user) => {
      socket.broadcast.emit("user", user);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

mainServer();

module.exports = mainServer;
