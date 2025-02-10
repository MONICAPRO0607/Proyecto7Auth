const jwt = require("jsonwebtoken");

// crear una llave (token)
const generateSign = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1y" });
}


// comprobar si esa llave fue creada correctamente
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateSign, verifyJwt }