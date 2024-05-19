const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const ArticleController = require("../controllers/ArticleController");
const FirstaidController = require("../controllers/FirstaidController");
const LikeController = require("../controllers/LikeController");
const CommentController = require("../controllers/CommentController");

const multer = require("multer");
const path = require("path");
router.use(express.static(path.join(__dirname, 'upload/images')));

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const timestamp = `${hours}${minutes}${seconds}`;

    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);

    const newFilename = `${nameWithoutExt}_${timestamp}${ext}`;
    return cb(null, newFilename);
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
router.post("/article/create", upload.single("image"), ArticleController.createArticle);
router.put("/article/update/:id", upload.single("image"), ArticleController.updateArticle);
router.put("/article/updatelike/:id", ArticleController.updateArticleLike);
router.put("/article/updateunlike/:id", ArticleController.updateArticleUnLike);
router.delete("/article/delete/:id", ArticleController.deleteArticle);

// Like routes
router.get("/like", LikeController.getLikeList);
router.get("/like/:article_id/user/:user_id",LikeController.getLikeByArticleIdUserId);
router.put("/like/liked/:article_id/:user_id",LikeController.updateLikeForLike);
router.put("/like/unliked/:article_id/:user_id",LikeController.updateLikeForUnLike);

// Firstaid routes
router.get("/firstaids", FirstaidController.getFirstaidList);
router.get("/firstaid/:id", FirstaidController.getFirstaidById);
router.get("/firstaids/counttype", FirstaidController.getFirstaidCountType);
router.post("/firstaid/create", upload.single("image"), FirstaidController.createFirstaid);
router.put("/firstaid/update/:id", upload.single("image"), FirstaidController.updateFirstaid);
router.delete("/firstaid/delete/:id", FirstaidController.deleteFirstaid);

// Comment routes
router.get("/comments/:article_id", CommentController.getCommentListByArticleId);
router.post("/comment/create",CommentController.createComment);


module.exports = router;
