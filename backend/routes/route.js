const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const ArticleController = require("../controllers/ArticleController");
const FirstaidController = require("../controllers/FirstaidController");
const LikeController = require("../controllers/LikeController");

const multer = require("multer");
const path = require("path");
router.use(express.static(path.join(__dirname, 'upload/images')));

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

// User routes
router.get("/users", UserController.getUserList);
router.get("/user/:id", UserController.getUserById);
router.get("/users/role_id/:role_id", UserController.getUserByRoleId);
router.get("/users/countmonth", UserController.getUserCountMonth);
router.delete("/user/:id", UserController.deleteUser);

// Article routes
router.get("/articles", ArticleController.getArticleList);
router.get("/article/:id", ArticleController.getArticleById);
router.get("/articles/like/:user_id", ArticleController.getArticleByUserId);
router.get("/articles/counttype", ArticleController.getArticleCountType);
router.post("/article/create", ArticleController.createArticle);
router.put("/article/updatelike/:id", ArticleController.updateArticleLike);
router.put("/article/updateunlike/:id", ArticleController.updateArticleUnLike);

// Like routes
router.get("/like", LikeController.getLikeList);
router.get(
  "/like/:article_id/user/:user_id",
  LikeController.getLikeByArticleIdUserId
);
router.put(
  "/like/liked/:article_id/:user_id",
  LikeController.updateLikeForLike
);
router.put(
  "/like/unliked/:article_id/:user_id",
  LikeController.updateLikeForUnLike
);

// Firstaid routes
router.get("/firstaids", FirstaidController.getFirstaidList);
router.get("/firstaid/:id", FirstaidController.getFirstaidById);
router.get("/firstaids/counttype", FirstaidController.getFirstaidCountType);
router.post(
  "/firstaid/create",
  upload.single("image"),
  FirstaidController.createFirstaid
);
router.put("/firstaid/update/:id", FirstaidController.updateFirstaid);
router.delete("/firstaid/delete/:id", FirstaidController.deleteFirstaid);

module.exports = router;
