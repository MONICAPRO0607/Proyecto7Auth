const { isAuth, isAdmin, isCustomer } = require("../../middlewares/auth");
const { createCustomer, login, updateCustomer, deleteCustomer, getCustomers } = require("../controllers/Customer");
const customersRoutes = require("express").Router();

customersRoutes.get("/", [isAuth, isAdmin], getCustomers);
customersRoutes.post("/createCustomer", [isAuth, isCustomer], createCustomer);
customersRoutes.post("/login", isCustomer, login);
customersRoutes.put("/updateCustomer", [isAuth, isCustomer], updateCustomer);
customersRoutes.delete("/:id", [isAuth, isCustomer], deleteCustomer);



module.exports = customersRoutes;