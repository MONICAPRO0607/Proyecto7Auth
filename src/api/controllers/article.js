const Article = require("../models/article");
const Users = require('../models/users');
const { launchSeed } = require("../../utils/seeds/seed.js")

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener artículos", error: error.message});
  }
}; 


// const getArticleById = async (req, res) => {
//   try {
//     const article = await Article.findById(req.params.id)
//       .populate('author', 'username email profile.firstName profile.lastName');

//     if (!article) {
//       return res.status(404).json({
//         success: false,
//         message: 'Artículo no encontrado'
//       });
//     }


//     res.status(200).json({
//       success: true,
//       data: article
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: 'Error al obtener el artículo',
//       error: error.message
//     });
//   }
// };


const getArticleByVendor = async (req, res, next) => {
    try {
        const allArticle = await Article.find({ verified: true}).populate('vendor');
        return res.status(200).json(allArticle);

    } catch (error) {
        return res.status(400).json({ message: "Ha fallado la petición", error: error.message });
    }
};

//     // Obtener todos los artículos con el autor
//     const articles = await Article.find(filter)
//       .populate('author', 'username email profile.firstName profile.lastName')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: articles.length,
//       data: articles
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: 'Error al obtener los artículos',
//       error: error.message
//     });
//   }
// };


const getArticleByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params;
    const article = await Article.find({ price: { $lte: precio } }).populate('vendor');
    return res.status(200).json(article);
  } catch (error) {
    return res.status(400).json({ message: "Error", error: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { name, vendor, img, price, type } = req.body;

    // Crear el artículo
    const article = await Article.create({
      name,
      vendor: req.user._id, 
      img,
      price, 
      type,
    });

    // Añadir el artículo a la lista de artículos del usuario
    await Users.findByIdAndUpdate(
      req.user._id, 
      { $push: { articles: article._id } }
    );

    res.status(201).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el artículo',
      error: error.message
    });
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
    const user = await user.findById(req.user.id); // Asegúrate de que `req.user.id` sea el ID del vendedor

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


// const updateArticle = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updatedArticle = await Article.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedArticle) {
//         return res.status(404).json({ message: "Artículo no encontrado" });
//     }
//     return res.status(200).json(updatedArticle);
// } catch (error) {
//     return res.status(400).json({ message: "Error al actualizar el artículo", error: error.message });
// }
// };

const updateArticle = async (req, res, next) => {
  try {
    let article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Artículo no encontrado'
      });
    }

    // Verificar si el usuario es el autor o un admin
    if (req.user.role !== 'admin' && 
        req.user._id.toString() !== article.vendor.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para actualizar este artículo'
      });
    }

    // Actualizar el artículo
    article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('vendor');

    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el artículo',
      error: error.message
    });
  }
};

const deleteArticle = async (req, res, next) => {
  try {
  const { id } = req.params;
  const deletedArticle = await Article.findByIdAndDelete(id);
  if (!Article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
  };
  
      // Verificar si el usuario es el autor o un admin
  if (req.user.role !== 'admin' && req.user._id.toString() !== Article.author.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este artículo'
      });
    };
    // Eliminar el artículo y su referencia en el usuario
    await Article.deleteOne();
    
    // Eliminar la referencia del artículo del usuario
    await Users.findByIdAndUpdate(
      Article.author, { $pull: { articles: Article._id } }
    );

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


module.exports = { getArticles, getArticleByVendor, getArticleByPrice, createArticle, postArticle, updateArticle, deleteArticle, chargeSeed };




// exports.getArticlesByUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
    
//     // Verificar si el usuario existe
//     const userExists = await User.findById(userId);
    
//     if (!userExists) {
//       return res.status(404).json({
//         success: false,
//         message: 'Usuario no encontrado'
//       });
//     }

//     // Construir el filtro
//     const filter = { author: userId };
    
//     // Si no es admin ni el propio usuario, solo ver publicados
//     if (!req.user || (req.user.role !== 'admin' && 
//         req.user._id.toString() !== userId)) {
//       filter.published = true;
//     }

//     // Buscar los artículos
//     const articles = await Article.find(filter)
//       .populate('author')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: articles.length,
//       data: articles
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: 'Error al obtener los artículos',
//       error: error.message
//     });
//   }
// };