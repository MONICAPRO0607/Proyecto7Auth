const Article = require("../models/article");

//! CRUD -> create read update delete

//! Create
const postArticle = async (req, res, next) => {
    try {
        const newArticle = new Article(req.body);

        if (req.seller.rol === "Admin") {
          newArticle.verified = true;
        } else {
          newArticle.verified = false;
        };

        const articleSaved = await newArticle.save();
        return res.status(201).json(articleSaved);

    } catch (error) {
        return res.status(400).json("Ha fallado la petición");
    }
}

//! Read
const getArticle = async (req, res, next) => {
    try {
        const allArticle = await Article.find({ verified: true});
        return res.status(200).json(allArticle);

    } catch (error) {
        return res.status(400).json("Ha fallado la petición");
    }
}

// eRead by price
const getArticleByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params;
    const article = await Article.find({ price: { $lte: precio } });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(400).json("Error");
  }
};

module.exports = { postArticle, getArticle, getArticleByPrice };