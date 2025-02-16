const { isAuth, isAdmin } = require("../../middlewares/auth");
const { register, login, deleteCustomers, getCustomers } = require("../controllers/customers");

const customersRoutes = require("express").Router();

// customersRoutes.get("/", [isAuth], getCustomers);
// customersRoutes.post("/register", [isAdmin], register);
// customersRoutes.post("/login", [isAuth], login);
// customersRoutes.delete("/:id", [isAdmin], deleteCustomers);

customersRoutes.get("/", getCustomers);
customersRoutes.post("/register", register);
customersRoutes.post("/login", login);
customersRoutes.delete("/:id", deleteCustomers);

module.exports = customersRoutes;