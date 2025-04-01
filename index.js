require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const { connectDB } = require('./src/config/db');
const articleRoutes = require("./src/api/routes/article");
const usersRoutes = require('./src/api/routes/users');
const customersRoutes = require('./src/api/routes/customers');

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/article", articleRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/customers", customersRoutes);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
});

app.listen(3000, () => {
  console.log("servidor desplegado en http://localhost:3000");
});
