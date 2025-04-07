const { generateToken } = require('../../utils/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Article = require('../models/article')

const getUsers = async (req, res, next) => {
  try {
    const usersList = await User.find()
    return res.status(200).json(usersList)
  } catch (error) {
    return res.status(400).json({ message: 'Error al gettear users', error: error.message })
  }
};

const register = async (req, res, next) => {
  try {
    const { username, password, role, articles } = req.body

    // Verificar si el nombre de usuario ya existe
    const userDuplicated = await User.findOne({ username })
    if (userDuplicated) {
      return res.status(400).json('Ese nombre de vendedor/a ya existe')
    }

    // Crear un nuevo usuario solo si el nombre de usuario no existe
    const newUser = new User({ username, password, role, articles })
    const userSaved = await newUser.save()

    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json({
      message: 'Error al crear un nuevo vendedor/a',
      error: error.message
    })
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrectos');
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id);
      return res.status(200).json({ token, user });
    }else{
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Error al iniciar sesión', error: error.message })
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await user.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const updatedUser = await user.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json({ message: 'Error al actualizar usuario', error: error.message })
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await user.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    return res.status(200).json({ message: 'Usuario eliminado', user })
  } catch (error) {
    return res.status(400).json({ message: 'Error al eliminar usuario', error: error.message })
  }
};

module.exports = { getUsers, register, login, updateUser, deleteUser }
