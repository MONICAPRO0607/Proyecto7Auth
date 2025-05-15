const { generateToken } = require('../../utils/jwt')
const Customers = require('../models/Customer')
const bcrypt = require('bcrypt')

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customers.find()
    return res.status(200).json(customers)
  } catch (error) {
    console.log("Error al obtener clientes", error);
    return res.status(400).json('Error al obtener clientes')
  }
};


const createCustomer = async (req, res) => {
  try {
    const { customerName, password, rol, article } = req.body;

    // Verificar si el cliente existe y coincide con su password 
    const customerExists = await Customers.findOne({ password });
    
    if (customerExists) {
      return res.status(400).json({success: false, message: 'Ya existe este cliente'});
    }

    // Crear el cliente
    const customer = await Customers.create({
      customerName, password, rol, article,
      // createdBy: req.user._id // El creador es el usuario autenticado
    });

    res.status(201).json({success: true, data: customer});
  } catch (error) {
    console.log("Error al crear el cliente", error);
    res.status(400).json('Error al crear el cliente');
  }
};


const login = async (req, res, next) => {
  try {
    const customers = await Customers.findOne({
      customerName: req.body.customerName
    })

    if (!customers) {
      console.log("El cliente o la contraseña es incorrecto", error);
      return res.status(400).json('El cliente o la contraseña es incorrecto')
    }

    if (bcrypt.compareSync(req.body.password, customers.password)) {
      //se loguea con jsonwebtoken
      const token = generateToken(customers._id)
      return res.status(200).json({ customers, token })
    } else {
      console.log("El cliente o la contraseña es incorrecto", error);
      return res.status(400).json('El cliente o la contraseña es incorrecto')
    }
  } catch (error) {
    console.log("El cliente o la contraseña es incorrecto", error);
    return res.status(400).json('El cliente o la contraseña es incorrecto')
  }
};

const updateCustomer = async (req, res) => {
  try {
    let customer = await customer.findById(req.params.id);

    if (!customer) {
      console.log("Cliente no encontrado", error);
      return res.status(404).json('Cliente no encontrado');
    }

    // Verificar si el usuario tiene permiso para actualizar este cliente
    if (req.user.role !== 'admin' && 
        req.user._id.toString() !== customer.createdBy.toString()) {
      return res.status(403).json('No tienes permisos para actualizar este cliente');
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
    console.log("Error al actualizar el cliente", error);
    res.status(500).json('Error al actualizar el cliente');
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await customer.findById(req.params.id);

    if (!customer) {
      console.log("Cliente no encontrado", error);
      return res.status(404).json('Cliente no encontrado');
    }

    // Verificar si el usuario tiene permiso para eliminar este cliente
    if (req.user.role !== 'admin' && 
        req.user._id.toString() !== customer.createdBy.toString()) {
      return res.status(403).json('No tienes permisos para eliminar este cliente');
    }

    // Eliminar el cliente
    await customer.deleteOne();

    res.status(200).json('Cliente eliminado correctamente');
  } catch (error) {
    console.log("Error al eliminar el cliente", error);
    res.status(400).json('Error al eliminar el cliente');
  }
};


module.exports = { getCustomers, createCustomer, login, updateCustomer, deleteCustomer}





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




