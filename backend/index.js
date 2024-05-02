const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Create Swagger
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const file = fs.readFileSync("./swagger.yaml", "utf8"); //อ่านไฟล์ YAML
const swaggerDocument = YAML.parse(file); // แปลง YAML เป็น JSON
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import Auth controllers
const AuthController = require("./controllers/AuthController");
app.use(AuthController);
// Import Routes
const Routes = require('./routes/route')
app.use('/', Routes);

/****************************** Create SocketIO *******************************/
// create server

// const http = require("http");
// const server = http.createServer(app);
// const socketIo = require("socket.io");
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// let likes = 0;

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("emit", (data) => {
//     console.log(data);
//     socket.broadcast.emit("count", { count: data.count });
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });

//   socket.on("like", () => {
//     likes++;
//     io.emit("updateLikes", likes);
//   });

//   socket.on("unlike", () => {
//     likes = Math.max(likes - 1, 0);
//     io.emit("updateLikes", likes);
//   });
// });

/****************************** END SocketIO *******************************/

//ใช้ server แทน app ถ้าใช้ socket.io
app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
