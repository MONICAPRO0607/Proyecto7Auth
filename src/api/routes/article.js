const { postArticle, getArticle, getArticleByPrice, chargeSeed } = require("../controllers/article");

const articleRoutes = require("express").Router();

articleRoutes.post("/", postArticle);
articleRoutes.get("/", getArticle);
articleRoutes.get("/getArticleByPrice/:price", getArticleByPrice);
// articleRoutes.get("/seed", chargeSeed);


module.exports = articleRoutes;