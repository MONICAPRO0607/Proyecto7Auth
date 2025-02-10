const { generateSign } = require("../../config/jwt");
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
    const newSeller = new Seller({
      sellerName: req.body.sellerName,
      password: req.body.password,
      rol: "seller"
    });

    const sellerDuplicated = await Seller.findOne({ userName: req.body.SellerName });

    if (sellerDuplicated) {
      return res.status(400).json("Ese nombre de usuario ya existe");
    }

    const sellerSaved = await newSeller.save();

    return res.status(201).json(sellerSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const login = async (req, res, next) => {
  try {
    const sellers = await Sellers.findOne({ sellersName: req.body.sellersName });

    if (!sellers) {
      return res.status(400).json("El usuario o la contraseña es incorrecto");
    }

    if (bcrypt.compareSync(req.body.password, sellers.password)) {
      //se loguea con jsonwebtoken
      const token = generateSign(sellers._id);
      return res.status(200).json({ sellers, token });
    } else {
      return res.status(400).json("El usuario o la contraseña es incorrecto");
    }
    
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteSellers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sellersDeleted = await Sellers.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Este usuario ha sido eliminado",
      sellersDeleted,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getSellers, register, login, deleteSellers };