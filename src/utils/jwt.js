const jwt = require('jsonwebtoken');

// una función para crear una llave (token)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1y' })
}

// comprobar si esa llave fue creada correctamente
const verifyToken = (token) => {
  // try {
    return jwt.verify(token, process.env.JWT_SECRET)
  // } catch (error) {
  //   return null // O lanza un error personalizado, según necesidad.
  // }
}

module.exports = { generateToken, verifyToken }
