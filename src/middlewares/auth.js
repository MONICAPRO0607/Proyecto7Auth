// const Users = require('../api/models/users')
// const Customers = require('../api/models/customers')
// const { verifyToken } = require('../config/jwt')

// const isAuth = async (req, res, next) => {
//   // console.log('req', req, 'res', res, 'next', next);
//   console.log('req', req.headers)
//   // console.log('res', res);
//   // console.log('next', next);c

//   try {
//     const token = req.headers.authorization

//     if (!token) {
//       return res.status(400).json('No estás autorizado')
//     }

//     const parsedToken = token.replace('Bearer ', '')
//     const { id } = verifyToken(parsedToken)

//     if (!decoded || !decoded.id) {
//       return res.status(401).json({ message: 'Token inválido' }) // No hace falta el error aquí
//     }
//     const user = await Users.findById(id)
//     if (!user) {
//       user = await Customers.findById(id)
//       if (!user) {
//         return res.status(401).json({ message: 'No estás autorizado' })
//       }
//       req.customers = user
//     } else {
//       req.users = user
//     }
//     user.password = undefined
//     next()
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ message: 'Token inválido', error: error.message })
//   }
// }

// const isAdmin = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization
//     if (!token) {
//       return res.status(400).json({ message: 'No estás autorizado' })
//     }
//     const parsedToken = token.replace('Bearer ', '')
//     const { id } = verifyToken(parsedToken, process.env.JWT_SECRET)
//     const users = await users.findById(id)
//     if (Users.role !== 'admin') {
//       return res
//         .status(403)
//         .json({ message: 'No tienes permisos de administrador' })
//     }
//     Users.password = null
//     req.user = Users
//     next()
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ message: 'No estás autorizado', error: error.message })
//   }
// }

// module.exports = { isAuth, isAdmin }

const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");

        const { id } = verifyJwt(parsedToken);

        const user = await User.findById(id);

        user.password = null;
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json("No estás autorizado");
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");

        const { id } = verifyJwt(parsedToken);

        const user = await User.findById(id);

        if (user.role === "admin") {
            user.password = null;
            req.user = user;
            next();
        } else {
            return res.status(400).json("Esta acción sólo la pueden realizar los administradores")
        }

        
    } catch (error) {
        return res.status(400).json("No estás autorizado");
    }
}

module.exports = { isAuth, isAdmin }