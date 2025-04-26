const { isAuth, isAdmin } = require("../../middlewares/auth");
const { createCustomer, login, updateCustomer, deleteCustomer, getCustomers, changeRole } = require("../controllers/Customer");
const customersRoutes = require("express").Router();

customersRoutes.get("/", [isAuth, isAdmin], getCustomers);
customersRoutes.post("/createCustomer", createCustomer);
customersRoutes.post("/login", login);
customersRoutes.put("/updateCustomer", updateCustomer);
customersRoutes.delete("/:id", [isAuth, isAdmin], deleteCustomer);
customersRoutes.post("/", isAdmin, changeRole);


module.exports = customersRoutes;