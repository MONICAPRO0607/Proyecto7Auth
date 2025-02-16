const { isAuth, isAdmin } = require("../../middlewares/auth");
const { register, login, deleteSellers, getSellers } = require("../controllers/sellers");

const sellersRoutes = require("express").Router();

// sellersRoutes.get("/", [isAuth], getSellers);
// sellersRoutes.post("/register", [isAdmin], register);
// sellersRoutes.post("/login", [isAuth], login);
// sellersRoutes.delete("/:id", [isAdmin], deleteSellers);

sellersRoutes.get("/", getSellers);
sellersRoutes.post("/register", register);
sellersRoutes.post("/login", login);
sellersRoutes.delete("/:id", deleteSellers);

module.exports = sellersRoutes;