const mysql = require("mysql");
const mongodb = require("mongodb");

// create database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Benz0641453596",
  database: "firstaidsystem",
});

module.exports = db;
