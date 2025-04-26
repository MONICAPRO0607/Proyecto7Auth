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