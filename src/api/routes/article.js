const { isAuth, isAdmin } = require('../../middlewares/auth')
const {
  getArticles,
  getArticleByVendor,
  getArticleByPrice,
  createArticle,
  postArticle,
  updateArticle,
  deleteArticle,
  chargeSeed
} = require('../controllers/Article')

const articleRoutes = require('express').Router()

articleRoutes.get('/', getArticles)
articleRoutes.get('/:vendor', [isAuth, isAdmin], getArticleByVendor)
articleRoutes.get(
  '/getArticleByPrice/:price',
  [isAuth, isAdmin],
  getArticleByPrice
)
articleRoutes.post('/', [isAuth, isAdmin], createArticle)
articleRoutes.post('/', postArticle)
articleRoutes.put('/:id', isAuth, updateArticle)
articleRoutes.delete('/:id', [isAuth, isAdmin], deleteArticle)
articleRoutes.get('/seed', isAdmin, chargeSeed)

module.exports = articleRoutes;
