const mongoose = require('mongoose')
const Article = require('../../api/models/article')
const articles = require("../../data/article");

const lanzarSemilla = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado a la base de datos olé')

    await Article.collection.drop()
    console.log('Artículos eliminados')

    await Article.insertMany(articles).then(docs => {
      console.log("Artículos insertados correctamente:", docs);
    })
    .catch(err => {
      console.error("Error al insertar artículos:", err);
    });
    console.log('Artículos añadidos')

    await mongoose.disconnect()
    console.log('Se desconecta la BBDD')
  } catch (error) {
    console.log('Error')
  }
}

lanzarSemilla()
