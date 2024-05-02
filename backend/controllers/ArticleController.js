// const express = require("express");
// const router = express.Router();
const db = require("../config/db");

// router.get("/articles", (req, res) => {
exports.getArticleList = (req, res) => {
  const articleData = req.body;
  db.query("SELECT * FROM articles", articleData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// router.get("/article/:id", (req, res) => {
exports.getArticleById = (req, res) => {
  const articleId = req.params.id;
  db.query("SELECT * FROM articles WHERE id = ?", articleId, (err, result) => {
    if (err) {
      console.error("Error fetching article by ID:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }
    return res.status(200).json(result[0]);
  });
};

exports.getArticleByUserId = (req, res) => {
  db.query(
    "SELECT * FROM articles JOIN likes ON articles.id = likes.article_id WHERE user_id = ? ORDER BY articles.id",
    req.params.user_id,
    (err, result) => {
      if (err) {
        console.log("error in users", err);
      } else {
        res.send(result);
      }
    }
  );
};

// router.get("/articles/counttype", (req, res) => {
exports.getArticleCountType = (req, res) => {
  db.query(
    "SELECT articletype.name, COUNT(articles.id) AS count FROM articles JOIN articletype ON articles.type_id = articletype.id GROUP BY articles.type_id",
    (err, result) => {
      if (err) {
        console.log("error in users", err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.createArticle = (req, res) => {
  db.query(
    "INSERT INTO articles (title, content, image, type_id, `like_count`, created_date) VALUES(?,?,?,?,?,?)",
    [
      req.body.title,
      req.body.content,
      req.body.image,
      req.body.type_id,
      req.body.like_count,
      new Date(),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Article Create Success");
      }
    }
  );
};

exports.updateArticleLike = (req, res) => {
  db.query(
    "UPDATE articles SET `like_count` = `like_count` + 1 WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.error("Error Updating Article Like Count:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Article Liked Successfully!", result);
        return res.status(200).send("Article Like Success");
      }
    }
  );
};

exports.updateArticleUnLike = (req, res) => {
  db.query(
    "UPDATE articles SET `like_count` = `like_count` - 1 WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) {
        console.error("Error Updating Article Like Count:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Article Unliked Successfully!", result);
        return res.status(200).send("Article UnLike Success");
      }
    }
  );
};

// module.exports = router;
