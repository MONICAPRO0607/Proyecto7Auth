const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getArticles, postArticle, getArticle, getArticleByPrice, chargeSeed, updateArticle, deleteArticle } = require("../controllers/article");

const articleRoutes = require("express").Router();

articleRoutes.get("/", [isAdmin], getArticles);
articleRoutes.post("/", [isAuth, isAdmin], postArticle);
articleRoutes.get("/:vendor", [isAuth, isAdmin], getArticle);
articleRoutes.get("/getArticleByPrice/:price", [isAuth, isAdmin], getArticleByPrice);
articleRoutes.put("/:id", [isAuth], updateArticle);
articleRoutes.delete("/:id", [isAuth, isAdmin], deleteArticle);
articleRoutes.get("/seed", [isAdmin], chargeSeed);


module.exports = articleRoutes;