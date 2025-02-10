const { postArticle, getArticle, getArticleByPrice } = require("../controllers/article");

const articleRoutes = require("express").Router();

articleRoutes.post("/", postArticle);
articleRoutes.get("/", getArticle);
articleRoutes.get("/getArticleByPrice/:price", getArticleByPrice);


module.exports = articleRoutes;