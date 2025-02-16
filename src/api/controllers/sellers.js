const { generateToken } = require("../../config/jwt");
const Sellers = require("../models/sellers");
const bcrypt = require("bcrypt");

const getSellers = async (req, res, next) => {
  try {
    const sellers = await Sellers.find();
    return res.status(200).json(sellers)
  } catch (error) {
    return res.status(400).json("Error")
  }
};
//! postUser - Create
const register = async (req, res, next) => {
  try {
    const newSeller = new Sellers({
      sellerName: req.body.sellerName,
      password: req.body.password,
      rol: req.body.rol
    });

    const sellerDuplicated = await Sellers.findOne({ sellerName: req.body.sellerName });

    if (sellerDuplicated) {
      return res.status(400).json("Ese nombre de vendedor/a ya existe");
    }

    const sellerSaved = await newSeller.save();

    return res.status(201).json(sellerSaved);
  } catch (error) {
    return res.status(400).json({messge: "Error al crear un nuevo vendedor/a", error:error.message});
  }
};

const login = async (req, res, next) => {
  try {
    const sellers = await Sellers.findOne({ sellerName: req.body.sellerName });

    if (!sellers) {
      return res.status(400).json({message: "El vendedor/a o la contraseña es incorrecto", error: error.message});
    }

    if (bcrypt.compareSync(req.body.password, sellers.password)) {
      //se loguea con jsonwebtoken
      const token = generateToken(sellers._id);
      return res.status(200).json({ sellers, token });
    } else {
      return res.status(400).json({message: "El vendedor/a o la contraseña es incorrecto", error: error.message});
    }
    
  } catch (error) {
    return res.status(400).json({message: "El vendedor/a o la contraseña es incorrecto", error: error.message});
  }
};

const deleteSellers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sellersDeleted = await Sellers.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Este vendedor/a ha sido eliminado",
      sellersDeleted,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getSellers, register, login, deleteSellers };