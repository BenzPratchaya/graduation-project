// const express = require("express");
// const router = express.Router();
const db = require("../config/db");

exports.getLikeList = (req, res) => {
  db.query("SELECT * FROM `likes`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.getLikeByArticleIdUserId = (req, res) => {
  const articleId = req.params.article_id;
  const userId = req.params.user_id;
  db.query(
    "SELECT * FROM `likes` WHERE article_id = ? AND user_id = ?",
    [articleId, userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

exports.updateLikeForLike = (req, res) => {
  db.query(
    "UPDATE `likes` SET `liked` = 1 WHERE article_id = ? AND user_id = ?",
    [req.params.article_id, req.params.user_id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Like for Like Count:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Like for Unlike Successfully!");
        return res.status(200).json({ liked: 1 });
      }
    }
  );
};

exports.updateLikeForUnLike = (req, res) => {
  db.query(
    "UPDATE `likes` SET `liked` = 0 WHERE article_id = ? AND user_id = ?",
    [req.params.article_id, req.params.user_id],
    (err, result) => {
      if (err) {
        console.error("Error Updating Like for Unlike Count:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Like for Unlike Successfully!");
        return res.status(200).json({ liked: 0 });
      }
    }
  );
};

// module.exports = router;
