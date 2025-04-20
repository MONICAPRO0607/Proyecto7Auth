const User = require('../api/models/users')
const { verifyToken } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
   const token = req.headers.authorization?.replace('Bearer ', '')

    if(!token) return res.status(401).json("unauthoraized")
  try {
    const {id} = verifyToken(token, process.env.JWT_SECRET)
    req.user = await User.findById(id);

    User.password = null;

    next()
  } catch (error) {
    return res.status(401).json("Unauthoraized")
  }
}

const isAdmin = async (req, res, next) => {
  try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json('No se proporcionó token');

      const parsedToken = token.replace('Bearer ', '');
      const { id } = verifyToken(parsedToken);
      if (!id) return res.status(401).json('Token no válido');

      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (user.role === 'admin') {
          user.password = null;
          req.user = user;
          next();
      } else {
          return res.status(403).json('Esta acción sólo la pueden realizar los administradores');
      }
  } catch (error) {
      return res.status(400).json('No estás autorizado');
  }
};

module.exports = { isAuth, isAdmin }


// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Middleware para verificar si el usuario está autenticado
// exports.isAuthenticated = async (req, res, next) => {
//   try {
//     // Verificar si existe el token en los headers
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Acceso no autorizado. Token no proporcionado.' 
//       });
//     }

//     // Verificar y decodificar el token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    
//     // Buscar el usuario por ID y excluir la contraseña
//     const user = await User.findById(decoded.id).select('-password');
    
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Usuario no encontrado' 
//       });
//     }

//     // Guardar el usuario en el objeto request para usarlo en las rutas
//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Token inválido' 
//       });
//     }
    
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Token expirado' 
//       });
//     }
    
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error al autenticar usuario',
//       error: error.message 
//     });
//   }
// };

// // Middleware para verificar si el usuario es admin
// exports.isAdmin = (req, res, next) => {
//   // Se asume que isAuthenticated ya se ejecutó antes
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ 
//       success: false, 
//       message: 'Acceso denegado. Se requieren privilegios de administrador.' 
//     });
//   }
// };

// // Middleware para verificar si el usuario es propietario del recurso o admin
// exports.isOwnerOrAdmin = (model) => {
//   return async (req, res, next) => {
//     try {
//       // Se asume que isAuthenticated ya se ejecutó antes
//       if (req.user.role === 'admin') {
//         return next(); // Los admin tienen acceso completo
//       }

//       const resourceId = req.params.id;
//       const resource = await model.findById(resourceId);

//       if (!resource) {
//         return res.status(404).json({ 
//           success: false, 
//           message: 'Recurso no encontrado' 
//         });
//       }

//       // Verificar si el usuario es el propietario del recurso
//       // Esto asume que el recurso tiene un campo author o createdBy que hace referencia al User
//       const ownerId = resource.author || resource.createdBy;
      
//       if (ownerId && ownerId.toString() === req.user._id.toString()) {
//         return next();
//       }
      
//       res.status(403).json({ 
//         success: false, 
//         message: 'Acceso denegado. No eres el propietario de este recurso.' 
//       });
//     } catch (error) {
//       res.status(500).json({ 
//         success: false, 
//         message: 'Error al verificar permisos',
//         error: error.message 
//       });
//     }
//   };
// };