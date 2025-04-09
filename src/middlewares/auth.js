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
