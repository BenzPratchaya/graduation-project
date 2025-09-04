const mysql = require("mysql");
const mongodb = require("mongodb");

// create database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "1234",
  database: "firstaidsystem",
});

module.exports = db;
