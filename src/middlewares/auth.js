const User = require('../api/models/User')
const { verifyToken } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) return res.status(401).json('Unauthoraized')
  try {
    const { id } = verifyToken(token, process.env.JWT_SECRET)
    req.user = await User.findById(id)

    req.user.password = null

    next()
  } catch (error) {
    return res.status(401).json('Unauthoraized')
  }
}

const isAdmin = async (req, res, next) => {
  try {

    if (req.user.role === 'admin') {
      next()
    } else {
      return res
        .status(403)
        .json('Esta acción sólo la pueden realizar los administradores')
    }
  } catch (error) {
    return res.status(400).json('No estás autorizado')
  }
};

const isCustomer = async (req, res, next) => {
  try {

    if (req.user.role === 'customer') {
      next()
    } else {
      return res
        .status(403)
        .json('Esta acción sólo la pueden realizar los administradores')
    }
  } catch (error) {
    return res.status(400).json('No estás autorizado')
  }
};

module.exports = { isAuth, isAdmin, isCustomer }