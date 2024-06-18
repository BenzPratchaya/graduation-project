const db = require("../config/db");

exports.getArticleTypeList = (req, res) => {
  db.query("SELECT * FROM articletype", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.getArticleTypeById = (req, res) => {
const articletypeId = req.params.id;
  db.query("SELECT * FROM articletype WHERE id = ?", articletypeId, (err, result) => {
    if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
  });
};