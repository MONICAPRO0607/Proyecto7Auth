// const mongoose = require('mongoose');
// const User = require('../models/User');
// const Article = require('../models/Article');
// const Customer = require('../models/Customer');
// const users = require('../data/users');
// const articles = require('../data/articles');
// const connectDB = require('../config/db');
// require('dotenv').config();

// // Función para importar datos
// const importData = async () => {
//   try {
//     await connectDB();
    
//     // Limpiar los datos existentes
//     await User.deleteMany();
//     await Article.deleteMany();
//     await Customer.deleteMany();
    
//     console.log('✅ Datos existentes eliminados');

//     // Importar usuarios
//     const createdUsers = await User.insertMany(users);
//     console.log(`✅ ${createdUsers.length} usuarios importados`);
    
//     // Asignar los artículos a usuarios aleatorios
//     const sampleArticles = articles.map(article => {
//       return {
//         ...article,
//         author: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
//       };
//     });

//     // Importar artículos
//     const createdArticles = await Article.insertMany(sampleArticles);
//     console.log(`✅ ${createdArticles.length} artículos importados`);

//     // Actualizar los usuarios con sus artículos
//     for (const article of createdArticles) {
//       await User.findByIdAndUpdate(
//         article.author,
//         { $push: { articles: article._id } }
//       );
//     }
//     console.log('✅ Referencias de artículos actualizadas en usuarios');

//     console.log('🚀 Datos importados correctamente');
//     process.exit();
//   } catch (error) {
//     console.error(`❌ Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// // Función para eliminar datos
// const destroyData = async () => {
//   try {
//     await connectDB();
    
//     await User.deleteMany();
//     await Article.deleteMany();
//     await Customer.deleteMany();
    
//     console.log('❌ Todos los datos han sido eliminados');
//     process.exit();
//   } catch (error) {
//     console.error(`❌ Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// // Determinar la acción basada en los argumentos de la línea de comandos
// if (process.argv[2] === '-d') {
//   destroyData();
// } else {
//   importData();
// }
