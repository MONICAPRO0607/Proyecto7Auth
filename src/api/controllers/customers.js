const { generateToken } = require("../../config/jwt");
const Customers = require("../models/customers");
const bcrypt = require("bcrypt");

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customers.find();
    return res.status(200).json(customers)
  } catch (error) {
    return res.status(400).json("Error")
  }
};
//! postUser - Create
const register = async (req, res, next) => {
  try {
    const newCustomer = new Customers({
      customerName: req.body.customerName,
      password: req.body.password,
      rol: req.body.rol
    });

    const customerDuplicated = await Customers.findOne({ customerName: req.body.customerName });

    if (customerDuplicated) {
      return res.status(400).json("Ese nombre del cliente ya existe");
    }

    const customerSaved = await newCustomer.save();

    return res.status(201).json(customerSaved);
  } catch (error) {
    return res.status(400).json({messge: "Error al crear un nuevo cliente", error:error.message});
  }
};

const login = async (req, res, next) => {
  try {
    const customers = await Customers.findOne({ customerName: req.body.customerName });

    if (!customers) {
      return res.status(400).json({message: "El cliente o la contraseña es incorrecto", error: error.message});
    }

    if (bcrypt.compareSync(req.body.password, customers.password)) {
      //se loguea con jsonwebtoken
      const token = generateToken(customers._id);
      return res.status(200).json({ customers, token });
    } else {
      return res.status(400).json({message: "El cliente o la contraseña es incorrecto", error: error.message});
    }
    
  } catch (error) {
    return res.status(400).json({message: "El cliente o la contraseña es incorrecto", error: error.message});
  }
};

const deleteCustomers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customersDeleted = await Customers.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Este cliente ha sido eliminado",
      customersDeleted,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getCustomers, register, login, deleteCustomers };