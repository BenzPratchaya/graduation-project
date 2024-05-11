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
const Routes = require("./routes/route");
app.use("/", Routes);

const multer = require("multer");
const path = require("path");
app.use(express.static(path.join(__dirname, "upload/images")));

// กำหนดการบันทึกไฟล์ด้วย Multer
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use("/image", express.static("upload/images"));
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("File uploaded:", req.file);

  res.json({
    status: "success",
    image_url: `http://localhost:3001/images/${req.file.filename}`,
  });
});

const db = require("./config/db");
app.post("/firstaid/created", upload.single("image"), (req, res) => {
  // ตรวจสอบว่ามีการอัปโหลดไฟล์ภาพหรือไม่
  if (!req.file) {
    return res.status(400).send("No image file uploaded");
  }

  const name = req.body.name;
  const detail = req.body.detail;
  const image = req.file.filename; // ใช้ไฟล์ที่ Multer อัปโหลด
  const video = req.body.video;
  const type_id = req.body.type_id;
  const created_date = new Date();

  db.query(
    "INSERT INTO firstaids (name, detail, image, video, type_id, created_date) VALUES(?,?,?,?,?,?)",
    [name, detail, image, video, type_id, created_date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Firstaid Create Success");
      }
    }
  );
});

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
