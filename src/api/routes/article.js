const { isAuth, isAdmin } = require('../../middlewares/auth')
const {
  getArticles,
  getArticleByVendor,
  getArticleByPrice,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/Article')

const articleRoutes = require('express').Router()

articleRoutes.get('/', getArticles)
articleRoutes.get('/:vendor', getArticleByVendor)
articleRoutes.get('/getArticleByPrice/:price', getArticleByPrice)
articleRoutes.post('/', isAuth, createArticle)
articleRoutes.put('/:id', isAuth, updateArticle)
articleRoutes.delete('/:id', [isAuth, isAdmin], deleteArticle)

module.exports = articleRoutes;
