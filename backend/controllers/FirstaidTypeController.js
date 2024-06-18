const db = require("../config/db");

exports.getFirstaidTypeList = (req, res) => {
  db.query("SELECT * FROM firstaidtype", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.getFirstaidTypeById = (req, res) => {
const firstaidtypeId = req.params.id;
  db.query("SELECT * FROM firstaidtype WHERE id = ?", firstaidtypeId, (err, result) => {
    if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
  });
};