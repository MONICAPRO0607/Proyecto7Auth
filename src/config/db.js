const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado con éxito a la bbdd 👍");
  } catch (error) {
    console.log("No se ha realizado la conexión a la bbdd 👎");
  }
}

module.exports = { connectDB };

// // Conexión a MongoDB Atlas utilizando Mongoose
// const mongoose = require('mongoose');
// require('dotenv').config();

// // URL de conexión a MongoDB Atlas
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nodeapi';

// // Opciones de configuración para Mongoose
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// // Función para conectar a la base de datos
// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI, options);
//     console.log('✅ Conexión exitosa a MongoDB Atlas');
//   } catch (error) {
//     console.error('❌ Error al conectar a MongoDB:', error.message);
//     process.exit(1); // Salir con error
//   }
// };

// module.exports = connectDB;