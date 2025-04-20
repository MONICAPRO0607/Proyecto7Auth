const { generateToken } = require('../../utils/jwt')
const Customers = require('../models/customers')
const bcrypt = require('bcrypt')

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customers.find()
    return res.status(200).json(customers)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al obtener clientes', error: error.message })
  }
};


const createCustomer = async (req, res) => {
  try {
    const { customerName, password, rol, article } = req.body;

    // Verificar si el cliente existe y coincide con su password 
    const customerExists = await customer.findOne({ password });
    
    if (customerExists) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe este cliente'
      });
    }

    // Crear el cliente
    const customer = await customer.create({
      customerName, password, rol, article,
      createdBy: req.user._id // El creador es el usuario autenticado
    });

    res.status(201).json({
      success: true,
      data: customer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el cliente',
      error: error.message
    });
  }
};


const login = async (req, res, next) => {
  try {
    const customers = await Customers.findOne({
      customerName: req.body.customerName
    })

    if (!customers) {
      return res
        .status(400)
        .json({
          message: 'El cliente o la contraseña es incorrecto',
          error: error.message
        })
    }

    if (bcrypt.compareSync(req.body.password, customers.password)) {
      //se loguea con jsonwebtoken
      const token = generateToken(customers._id)
      return res.status(200).json({ customers, token })
    } else {
      return res
        .status(400)
        .json({
          message: 'El cliente o la contraseña es incorrecto',
          error: error.message
        })
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'El cliente o la contraseña es incorrecto',
        error: error.message
      })
  }
};

const updateCustomer = async (req, res) => {
  try {
    let customer = await customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }

    // Verificar si el usuario tiene permiso para actualizar este cliente
    if (req.user.role !== 'admin' && 
        req.user._id.toString() !== customer.createdBy.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para actualizar este cliente'
      });
    }

    // Actualizar el cliente
    customer = await customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username email');

    res.status(200).json({
      success: true,
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el cliente',
      error: error.message
    });
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }

    // Verificar si el usuario tiene permiso para eliminar este cliente
    if (req.user.role !== 'admin' && 
        req.user._id.toString() !== customer.createdBy.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este cliente'
      });
    }

    // Eliminar el cliente
    await customer.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Cliente eliminado correctamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al eliminar el cliente',
      error: error.message
    });
  }
};

// Controlador para cambiar rol a admin
const changeRole = async (req, res, next) => {
  try {
    const { id } = req.params
    const customer = await Customers.findById(id)
    if (!customer) {
      return res.status(404).json('Cliente no encontrado')
    }
    customer.rol = 'admin' // Cambiar rol a admin
    await customer.save()
    return res.status(200).json(customer)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al cambiar rol', error: error.message })
  }
}

module.exports = { getCustomers, createCustomer, login, updateCustomer, deleteCustomer, changeRole }

// const Customer = require('../models/Customer');



// exports.getCustomers = async (req, res) => {
//   try {
//     let filter = {};
    
//     // Si no es admin, solo mostrar los clientes creados por el usuario
//     if (req.user.role !== 'admin') {
//       filter.createdBy = req.user._id;
//     }

// * No hace falta filtrar por cliente, hay que mostrarlos todos.

//     res.status(200).json({
//       success: true,
//       count: customers.length,
//       data: customers
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error al obtener los clientes',
//       error: error.message
//     });
//   }
// };




