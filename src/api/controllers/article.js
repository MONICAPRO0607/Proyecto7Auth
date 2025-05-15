const mongoose = require("mongoose");
const Article = require('../models/Article.js');
const User = require('../models/User.js');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find()
    return res.status(200).json(articles)
  } catch (error) {
    console.log("Error al obtener artículos", error);
    return res.status(400).json('Error al obtener artículos')
  }
};

const getArticleByVendor = async (req, res, next) => {
  try {
    const allArticle = await Article.find({ verified: true }).populate('vendor');
    return res.status(200).json(allArticle)
  } catch (error) {
    console.log("Fallo en petición de artículos por vendedor", error);
    return res.status(400).json('Ha fallado la petición')
  }
};

const getArticleByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params
    const article = await Article.find({ price: { $lte: precio } }).populate('vendor');
    return res.status(200).json(article)
  } catch (error) {
    console.log("Error al obtener artículos por precio", error);
    return res.status(400).json('Error al obtener artículos por precio')
  }
};

const createArticle = async (req, res) => {
  try {
    const { name, vendor, img, price, type } = req.body;

    // Crear el artículo
    const newArticle = await Article.create({
      name,
      vendor,
      img,
      price,
      type
    });

    newArticle.verified = req.user.role === 'admin' // Verifica si el vendedor es admin

    // Guardar el artículo en la base de datos
    const articleSaved = await newArticle.save();

    // Añadir el artículo a la lista de artículos del usuario
    await User.findByIdAndUpdate(req.user._id, {$push: { articles: articleSaved._id }})
    res.status(201).json({success: true, data: articleSaved})
  } catch (error) {
    console.log("Error al crear el artículo", error);
    res.status(400).json('Error al crear el artículo')
  }
};


const updateArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({success: false, message: 'Artículo no encontrado'})
    }

    // Verificar si el usuario es el autor o un admin
    if (
      req.user._id.toString() !== article.vendor.toString()
    ) {
      return res.status(403).json({success: false,message: 'No tienes permisos para actualizar este artículo'})
    }

    // Actualizar el artículo
    article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true}).populate('vendor')

    res.status(200).json({success: true,data: article})
  } catch (error) {
    console.log("Error al actualizar el artículo", error);
    res.status(400).json('Error al actualizar el artículo')
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedArticle = await Article.findByIdAndDelete(id)
    if (!Article) {
      return res.status(404).json({ message: 'Artículo no encontrado' })
    }

    // Verificar si el usuario es el autor o un admin
    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== Article.author.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este artículo'
      })
    }
    // Eliminar el artículo y su referencia en el usuario
    await Article.deleteOne()

    // Eliminar la referencia del artículo del usuario
    await User.findByIdAndUpdate(Article.author, {
      $pull: { articles: Article._id }
    })

    return res.status(200).json({ message: 'Artículo eliminado', deletedArticle })
  } catch (error) {
    console.log("Error al eliminar el artículo", error);
    return res.status(400).json('Error al eliminar el artículo')
  }
};


module.exports = {getArticles, getArticleByVendor, getArticleByPrice, createArticle, updateArticle, deleteArticle}