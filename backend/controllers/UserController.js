// const express = require("express");
// const router = express.Router();
const db = require("../config/db");

// router.get("/users", (req, res) => {
exports.getUserList = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log("error in users", err);
    } else {
      res.send(result);
    }
  });
};

// router.get("/user/:id", (req, res) => {
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.status(404).send("User not found");
      }
    }
  });
};

// router.get("/users/role_id/:role_id", (req, res) => {
exports.getUserByRoleId = (req, res) => {
  const roleId = req.params.role_id;
  db.query("SELECT * FROM users WHERE role_id = ?", roleId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
};

// router.get("/users/countmonth", (req, res) => {
  exports.getUserCountMonth = (req, res) => {
    db.query("SELECT DATE_FORMAT(created_date, '%m/%Y') AS date, COUNT(id) AS count FROM users GROUP BY date;", (err, result) => {
      if (err) {
        console.log("error in users", err);
      } else {
        res.send(result);
      }
    });
  };

// router.delete("/user/delete/:id", (req, res) => {
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// module.exports = router;
