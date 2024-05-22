// const express = require("express");
// const router = express.Router();
const db = require("../config/db");
const fs = require('fs');
const path = require('path');

exports.getArticleList = (req, res) => {
  db.query("SELECT * FROM articles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

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
  // ตรวจสอบว่ามีการอัปโหลดไฟล์ภาพหรือไม่
  if (!req.file) {
    return res.status(400).send("No image file uploaded");
  }

  const { title, content, type_id } = req.body;
  const like_count = 0;
  const created_date = new Date();
  const image = req.file.filename;

  db.query(
    "INSERT INTO articles (title, content, image, type_id, like_count, created_date) VALUES (?, ?, ?, ?, ?, ?)",
    [title, content, image, type_id, like_count, created_date],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error creating article");
      } else {
        res.json({
          status: "Article Create Success",
          title: title,
          content: content,
          image: `http://localhost:3001/image/${image}`,
          type_id: type_id,
          like_count: like_count,
          created_date: created_date,
        });
      }
    }
  );
};

exports.updateArticle = (req, res) => {
  const { id, title, content, type_id } = req.body;
  let image = null;

  if (req.file) {
    image = req.file.filename;
  }

  // Step 1: Retrieve the existing image filename
  db.query("SELECT image FROM articles WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("Error retrieving article image:", err);
      return res.status(500).send("Error retrieving article image");
    }

    if (result.length === 0) {
      return res.status(404).send("Article not found");
    }

    const existingImage = result[0].image;

    // Step 2: Update the article in the database
    db.query(
      "UPDATE articles SET title = ?, content = ?, image = ?, type_id = ? WHERE id = ?",
      [title, content, image || existingImage, type_id, id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error updating article");
        }

        // Step 3: Delete the old image file if a new image is provided
        if (req.file && existingImage) {
          const imagePath = path.join(__dirname, '..', 'upload', 'images', existingImage);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log("Error deleting old image file:", err);
              // Continue even if there's an error deleting the old image
            }
            res.json({
              status: "Article Update Success",
              result: result,
            });
          });
        } else {
          res.json({
            status: "Article Update Success",
            result: result,
          });
        }
      }
    );
  });
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
        console.log("Article Liked Successfully!");
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
        console.log("Article Unliked Successfully!");
        return res.status(200).send("Article UnLike Success");
      }
    }
  );
};

exports.deleteArticle = (req, res) => {
  const id = req.params.id;

  // Step 1: Retrieve the image filename
  db.query("SELECT image FROM articles WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("Error retrieving article image:", err);
      return res.status(500).send("Error retrieving article image");
    }

    if (result.length === 0) {
      return res.status(404).send("Article not found");
    }

    const image = result[0].image;

    // Step 2: Delete the image file from the server
    if (image) {
      const imagePath = path.join(__dirname, '..', 'upload', 'images', image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("Error deleting image file:", err);
          return res.status(500).send("Error deleting image file");
        }

        // Step 3: Delete the article from the database
        db.query("DELETE FROM articles WHERE id = ?", id, (err, result) => {
          if (err) {
            console.log("Error deleting article:", err);
            return res.status(500).send("Error deleting article");
          }
          res.send(result);
        });
      });
    } else {
      // If there's no image, directly delete the article from the database
      db.query("DELETE FROM articles WHERE id = ?", id, (err, result) => {
        if (err) {
          console.log("Error deleting article:", err);
          return res.status(500).send("Error deleting article");
        }
        res.send(result);
      });
    }
  });
};

// module.exports = router;
