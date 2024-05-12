// const express = require("express");
// const router = express.Router();
const db = require("../config/db");

// router.get("/firstaids", (req, res) => {
exports.getFirstaidList = (req, res) => {
  db.query("SELECT * FROM firstaids", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// router.get("/firstaid/:id", (req, res) => {
exports.getFirstaidById = (req, res) => {
  const firstaidId = req.params.id;
  db.query(
    "SELECT * FROM firstaids WHERE id = ?",
    firstaidId,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        if (result.length > 0) {
          res.send(result[0]);
        } else {
          res.status(404).send("firstaid not found");
        }
      }
    }
  );
};

// router.get("/firstaids/counttype", (req, res) => {
exports.getFirstaidCountType = (req, res) => {
  db.query(
    "SELECT firstaidtype.name, COUNT(firstaids.id) AS count FROM firstaids JOIN firstaidtype ON firstaids.type_id = firstaidtype.id GROUP BY firstaids.type_id",
    (err, result) => {
      if (err) {
        console.log("error in users", err);
      } else {
        res.send(result);
      }
    }
  );
};

// router.post("/firstaid/create", (req, res) => {
exports.createFirstaid = (req, res) => {
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
    (req, res, err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.json({
    status: "Firstaid Create Success",
    name: name,
    detail: detail,
    image: `http://localhost:3001/image/${req.file.filename}`,
    video: video,
    type_id: type_id,
    created_date: created_date,
  });
};

// router.put("/firstaid/update", (req, res) => {
exports.updateFirstaid = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const detail = req.body.detail;
  const video = req.body.video;
  // เช็คว่ามีการอัปโหลดไฟล์ภาพหรือไม่
  let image = null;
  if (req.file) {
    image = req.file.filename;
  }
  db.query(
    "UPDATE firstaids SET name = ?, detail = ?, image = ?, video = ? WHERE id = ?",
    [name, detail, image, video, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

// router.delete("/firstaid/delete/:id", (req, res) => {
exports.deleteFirstaid = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM firstaids WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// module.exports = router;
