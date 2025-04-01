const { isAuth, isAdmin } = require("../../middlewares/auth");
const { postArticle, getArticle, getArticleByPrice, chargeSeed, updateArticle, deleteArticle } = require("../controllers/article");

const articleRoutes = require("express").Router();

articleRoutes.post("/", [isAuth], postArticle);
articleRoutes.get("/:vendor", getArticle);
articleRoutes.get("/getArticleByPrice/:price", [isAuth], getArticleByPrice);
articleRoutes.put("/:id", [isAuth], updateArticle);
articleRoutes.delete("/:id", [isAuth, isAdmin], deleteArticle);
articleRoutes.get("/seed", chargeSeed);


module.exports = articleRoutes;