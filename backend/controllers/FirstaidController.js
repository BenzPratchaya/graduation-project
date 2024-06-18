const db = require("../config/db");
const fs = require("fs");
const path = require("path");

exports.getFirstaidList = (req, res) => {
  db.query("SELECT * FROM firstaids", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.getFirstaidById = (req, res) => {
  const firstaidId = req.params.id;
  db.query("SELECT * FROM firstaids WHERE id = ?", firstaidId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.status(404).send("firstaid not found");
      }
    }
  });
};

exports.getFirstaidCountType = (req, res) => {
  db.query(
    "SELECT firstaidtype.name, COUNT(firstaids.id) AS count FROM firstaids JOIN firstaidtype ON firstaids.type_id = firstaidtype.id GROUP BY firstaids.type_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.getFirstaidCountMonth = (req, res) => {
  db.query("SELECT DATE_FORMAT(created_date, '%m/%Y') AS date, COUNT(id) AS count FROM firstaids GROUP BY date;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.createFirstaid = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image file uploaded");
  }

  const { name, detail, video, type_id } = req.body;
  const created_date = new Date();
  const image = req.file.filename;

  db.query(
    "INSERT INTO firstaids (name, detail, image, video, type_id, created_date) VALUES(?,?,?,?,?,?)",
    [name, detail, image, video, type_id, created_date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          status: "Firstaid Create Success",
          name: name,
          detail: detail,
          image: `http://localhost:3001/image/${req.file.filename}`,
          video: video,
          type_id: type_id,
          created_date: created_date,
        });
      }
    }
  );
};

exports.updateFirstaid = (req, res) => {
  const { id, name, detail, video, type_id } = req.body;
  let image = null;

  if (req.file) {
    image = req.file.filename;
  }

  // Step 1: Retrieve the existing image filename
  db.query("SELECT image FROM firstaids WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("Error retrieving firstaid image:", err);
      return res.status(500).send("Error retrieving firstaid image");
    }

    if (result.length === 0) {
      return res.status(404).send("Firstaid not found");
    }

    const existingImage = result[0].image;

    // Step 2: Update the firstaid in the database
    db.query(
      "UPDATE firstaids SET name = ?, detail = ?, image = ?, video = ?, type_id = ? WHERE id = ?",
      [name, detail, image || existingImage, video, type_id, id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error updating first aid");
        }

        // Step 3: Delete the old image file if a new image is provided
        if (req.file && existingImage) {
          const imagePath = path.join(__dirname, "..", "upload", "images", existingImage);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log("Error deleting old image file:", err);
              // Continue even if there's an error deleting the old image
            }
            res.json({
              status: "First Aid Update Success",
              result: result,
            });
          });
        } else {
          res.json({
            status: "First Aid Update Success",
            result: result,
          });
        }
      }
    );
  });
};

exports.deleteFirstaid = (req, res) => {
  const id = req.params.id;

  // Step 1: Retrieve the image filename
  db.query("SELECT image FROM firstaids WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("Error retrieving firstaid image:", err);
      return res.status(500).send("Error retrieving firstaid image");
    }

    if (result.length === 0) {
      return res.status(404).send("Firstaid not found");
    }

    const image = result[0].image;

    // Step 2: Delete the image file from the server
    if (image) {
      const imagePath = path.join(__dirname, "..", "upload", "images", image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("Error deleting image file:", err);
          return res.status(500).send("Error deleting image file");
        }

        // Step 3: Delete the firstaid from the database
        db.query("DELETE FROM firstaids WHERE id = ?", id, (err, result) => {
          if (err) {
            console.log("Error deleting firstaid:", err);
            return res.status(500).send("Error deleting firstaid");
          }
          res.send(result);
        });
      });
    } else {
      // If there's no image, directly delete the firstaid from the database
      db.query("DELETE FROM firstaids WHERE id = ?", id, (err, result) => {
        if (err) {
          console.log("Error deleting firstaid:", err);
          return res.status(500).send("Error deleting firstaid");
        }
        res.send(result);
      });
    }
  });
};
