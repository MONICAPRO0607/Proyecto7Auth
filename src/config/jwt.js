const jwt = require("jsonwebtoken");

// crear una llave (token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1y" });
}


// comprobar si esa llave fue creada correctamente
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken }