const db = require("../config/db");

exports.getCommentListByArticleId = (req, res) => {
  const { article_id } = req.params;
  const query = "SELECT * FROM comments WHERE article_id = ?";
  db.query(query, [article_id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

exports.createComment = (req, res) => {
  const { article_id, user_id, body, user_fname, user_lname } = req.body;
  const created_date = new Date();
  const query =
    "INSERT INTO comments (article_id, user_id, body, user_fname, user_lname, created_date) VALUES (?,?,?,?,?,?)";
  db.query(
    query,
    [article_id, user_id, body, user_fname, user_lname, created_date],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send(result);
    }
  );
};
