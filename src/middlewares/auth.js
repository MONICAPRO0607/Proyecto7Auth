const Sellers = require('../api/models/sellers')
const { verifyToken } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res
        .status(400)
        .json({ message: 'No estás autorizado 1', error: error.message })
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyToken(parsedToken)
    const sellers = await Sellers.findById(id)

    sellers.password = null
    req.sellers = sellers
    next()
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'No estás autorizado 2', error: error.message })
  }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");
        
        const { id } = verifyToken(parsedToken, process.env.JWT_SECRET);
        const sellers = await Sellers.findById(id);

        if (sellers.sellersName === "admin") {
          sellers.password = null;
          req.sellers = sellers;
          next();
      } else {
          return res.status(400).json("No puedes realizar la acción al no ser administrador");
      }

        if (!token) {
            return res.status(400).json({message: "No estás autorizado 3", error:error.message})
        }

    } catch (error) {
        return res.status(400).json({message: "No estás autorizado 4", error:error.message});
    }
}

module.exports = { isAuth, isAdmin }
