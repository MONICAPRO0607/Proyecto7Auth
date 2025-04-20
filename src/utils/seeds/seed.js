const mongoose = require('mongoose')
const User = require('../../api/models/users')
const users = require('../../data/users')
const Article = require('../../api/models/article')
const articles = require('../../data/article')
const bcrypt = require('bcrypt')

const launchSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado a la base de datos')

    // Borrar colecciones previas
    await User.collection.drop()
    await Article.collection.drop()

    console.log('Colecciones eliminadas')

    await Article.insertMany(articles)
    console.log('Articulos añadidos', articles)

    await User.insertMany(users)
    console.log('Usuarios añadidos', users)

    console.log('Usuarios y artículos insertados correctamente')
    mongoose.disconnect()
  } catch (error) {
    console.error('Error al insertar semilla', error)
  }
}

// launchSeed();

// const mongoose = require('mongoose');
// const User = require('../models/User');
// const connectDB = require('../config/db');
// require('dotenv').config();

// // Función para promover un usuario a administrador
// const createAdmin = async (email) => {
//   try {
//     await connectDB();
    
//     // Buscar el usuario por email
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       console.error(`❌ Usuario con email ${email} no encontrado`);
//       process.exit(1);
//     }
    
//     // Actualizar a rol de administrador
//     user.role = 'admin';
//     await user.save();
    
//     console.log(`✅ Usuario ${user.username} (${user.email}) promovido a administrador`);
//     process.exit();
//   } catch (error) {
//     console.error(`❌ Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// // Obtener email desde la línea de comandos o usar el predeterminado
// const adminEmail = process.argv[2] || 'admin@example.com';
// createAdmin(adminEmail);
