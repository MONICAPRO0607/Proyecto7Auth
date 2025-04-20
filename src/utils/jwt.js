const jwt = require('jsonwebtoken');

// una función para crear una llave (token)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
};

// comprobar si esa llave fue creada correctamente
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null // O lanza un error personalizado, según necesidad.
  }
};

module.exports = { generateToken, verifyToken }

// // Generar token JWT
// const generateToken = (id) => {
//   return jwt.sign(
//     { id }, 
//     process.env.JWT_SECRET || 'secret_key', 
//     { expiresIn: '30d' }
//   );
// };

// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const User = require('../models/User');
// const connectDB = require('../config/db');
// require('dotenv').config();

// // Función para generar un token JWT
// const generateToken = (id) => {
//   return jwt.sign(
//     { id }, 
//     process.env.JWT_SECRET || 'secret_key', 
//     { expiresIn: '30d' }
//   );
// };

// // Función para obtener un token para un usuario existente
// const getToken = async (email) => {
//   try {
//     await connectDB();
    
//     // Buscar el usuario por email
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       console.error(`❌ Usuario con email ${email} no encontrado`);
//       process.exit(1);
//     }
    
//     // Generar token
//     const token = generateToken(user._id);
    
//     console.log('\n=============== TOKEN JWT ===============');
//     console.log(`Usuario: ${user.username} (${user.email})`);
//     console.log(`Rol: ${user.role}`);
//     console.log(`ID: ${user._id}`);
//     console.log('\nToken:');
//     console.log(token);
//     console.log('\nHeader para peticiones:');
//     console.log(`Authorization: Bearer ${token}`);
//     console.log('=========================================\n');
    
//     process.exit();
//   } catch (error) {
//     console.error(`❌ Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// // Obtener email desde la línea de comandos o usar el predeterminado
// const userEmail = process.argv[2] || 'admin@example.com';
// getToken(userEmail);
