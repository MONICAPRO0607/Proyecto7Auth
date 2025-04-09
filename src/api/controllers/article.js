const Article = require("../models/article");
const { launchSeed } = require("../../utils/seeds/seed.js")

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener artículos", error: error.message});
  }
}; 

const postArticle = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    };
    
    const newArticle = new Article(req.body);

    newArticle.verified = req.user.role === "admin"; // Verifica si el vendedor es admin

    // Guardar el artículo en la base de datos
    const articleSaved = await newArticle.save();

    // Buscar al usuario (vendedor) que está asociado con este artículo
    const user = await User.findById(req.user.id); // Asegúrate de que `req.user.id` sea el ID del vendedor

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Agregar el ID del artículo al array de artículos del usuario
    user.articles.push(articleSaved._id);

    // Guardar el usuario con el nuevo artículo en su array
    await user.save();

    return res.status(201).json(articleSaved);
  } catch (error) {
    return res.status(400).json({ message: "Ha fallado la petición", error: error.message });
  }
};



const getArticle = async (req, res, next) => {
    try {
        const allArticle = await Article.find({ verified: true}).populate('vendor');
        return res.status(200).json(allArticle);

    } catch (error) {
        return res.status(400).json({ message: "Ha fallado la petición", error: error.message });
    }
};


const getArticleByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params;
    const article = await Article.find({ price: { $lte: precio } }).populate('vendor');
    return res.status(200).json(article);
  } catch (error) {
    return res.status(400).json({ message: "Error", error: error.message });
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedArticle = await Article.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedArticle) {
        return res.status(404).json({ message: "Artículo no encontrado" });
    }
    return res.status(200).json(updatedArticle);
} catch (error) {
    return res.status(400).json({ message: "Error al actualizar el artículo", error: error.message });
}
};

const deleteArticle = async (req, res, next) => {
  try {
  const { id } = req.params;
  const deletedArticle = await Article.findByIdAndDelete(id);
  if (!deletedArticle) {
      return res.status(404).json({ message: "Artículo no encontrado" });
  }
  return res.status(200).json({ message: "Artículo eliminado", deletedArticle });
} catch (error) {
  return res.status(400).json({ message: "Error al eliminar el artículo", error: error.message });
}};

const chargeSeed = async (req, res, next) => {
  try {
    await launchSeed();
    return res.status(200).json({ message: "Semilla cargada correctamente" });
  } catch (error) {
    return res.status(400).json({ message: "Error al cargar la semilla", error: error.message });
  }
};


module.exports = { getArticles, postArticle, getArticle, getArticleByPrice, updateArticle, deleteArticle, chargeSeed };