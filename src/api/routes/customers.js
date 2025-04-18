const { isAuth, isAdmin } = require("../../middlewares/auth");
const { register, login, deleteCustomers, getCustomers, changeRole } = require("../controllers/customers");
const customersRoutes = require("express").Router();

customersRoutes.get("/", [isAuth, isAdmin], getCustomers);
customersRoutes.post("/register", register);
customersRoutes.post("/login", login);
customersRoutes.delete("/:id", [isAuth, isAdmin], deleteCustomers);
customersRoutes.post("/", isAdmin, changeRole);


module.exports = customersRoutes;