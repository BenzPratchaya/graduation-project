const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/comments", (req, res) => {
  db.query("SELECT * FROM comments", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/comment/create", (req, res) => {
  const body = req.body.body;
  const username = req.body.username;
  const userId = req.body.userId;
  const parentId = req.body.parentId;
  const createdAt = req.body.createdAt;

  db.query(
    "INSERT INTO comments (body, username, userId, parentId, createdAt) VALUES(?,?,?,?,?)",
    [body, username, userId, parentId, createdAt],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

module.exports = router;
