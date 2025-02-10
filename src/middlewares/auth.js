const Sellers = require("../api/models/sellers");
const { verifyJwt } = require("../config/jwt");


const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json("No estás autorizado")
        }

        const parsedToken = token.replace("Bearer", "");
        const { id } = verifyJwt(parsedToken);
        const sellers = await Sellers.findById(id);

        sellers.password = null;
        req.sellers = sellers;
        next();

    } catch (error) {
        return res.status(400).json("No estás autorizado");
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer", "");

        const { id } = verifyJwt(parsedToken);
        const sellers = await Sellers.findById(id);

        if (Sellers.sellersName === "Admin") {
          sellers.password = null;
          req.sellers = sellers;
          next();
      } else {
          return res.status(400).json("No puedes realizar la acción al no ser administrador");
      }

        if (!token) {
            return res.status(400).json("No estás autorizado")
        }



    } catch (error) {
        return res.status(400).json("No estás autorizado");
    }
}

module.exports = { isAuth, isAdmin }