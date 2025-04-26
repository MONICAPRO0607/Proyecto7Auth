const { generateToken } = require('../../utils/jwt')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Article = require('../models/Article')

// //  Obtener todos los usuarios

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password')

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    })
  }
};

const register = async (req, res, next) => {
  try {
    const user = new User(req.body);

    // Verificar si el nombre de usuario ya existe
    const userDuplicated = await User.findOne({ password: req.body.password });
    if (userDuplicated) {
      return res.status(400).json('Ese vendedor/a ya existe')
    };

    const userSaved = await user.save();
      return res.status(201).json(userSaved);
    } catch (error) {
    return res.status(400).json({
      message: 'Error al crear un nuevo vendedor/a', error: error.message
    })
  }
};

const login = async (req, res, next) => {
  try {

    const { email, password } =req.body; 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrectos')
    };

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id);
      return res.status(200).json({ token, user })
    } else {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' })
    };
  } catch (error) {
    return res.status(400).json({ message: 'Error al iniciar sesión', error: error.message })
  }
};

const updateUser = async (req, res, next) => {
  try {
    // const { id } = req.params
    const user = await user.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    //     // Actualizar campos permitidos
    if (req.body.username) user.username = req.body.username
    if (req.body.password) user.password = req.body.password
    if (req.body.article) user.article = req.body.article

    //     // No permitir cambiar el rol aquí por seguridad

    const updatedUser = await user.save()

    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        password: updatedUser.password,
        role: updatedUser.role,
        article: updatedUser.article,
        token: generateToken(updatedUser._id)
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar perfil',
      error: error.message
    })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await user.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Verificar si es el mismo usuario o un admin
    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== req.params.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este usuario'
      })
    }

    await user.deleteOne()

    return res.status(200).json({ message: 'Usuario eliminado', user })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al eliminar usuario', error: error.message })
  }
}

module.exports = { getUsers, register, login, updateUser, deleteUser }
