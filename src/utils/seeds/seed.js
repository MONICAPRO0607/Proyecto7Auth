require('dotenv').config();
const mongoose = require('mongoose')
const User = require('../../api/models/User')
const users = require('../../data/users')
const Article = require('../../api/models/Article')
const articles = require('../../data/article')

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

launchSeed();
