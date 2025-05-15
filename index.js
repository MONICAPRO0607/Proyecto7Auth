require('dotenv').config();
const express = require("express");
const { connectDB } = require('./src/config/db');
const articleRoutes = require("./src/api/routes/Article");
const usersRoutes = require('./src/api/routes/User');
const customersRoutes = require('./src/api/routes/Customer');

const app = express();

app.use(express.json());

connectDB();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/v1/article", articleRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/customer", customersRoutes);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
});

// Ruta de prueba para la API
app.get('/', (req, res) => {
  res.json({
    message: 'API Node.js, Express y MongoDB Atlas funcionando correctamente',
    endpoints: {
      users: '/api/users',
      articles: '/api/articles',
      customers: '/api/customers'
    }
  });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

app.listen(3000, () => {
  console.log("servidor desplegado en http://localhost:3000");
});
