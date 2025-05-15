const { generateToken } = require('../../utils/jwt')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Article = require('../models/Article')

// //  Obtener todos los usuarios

const getUsers = async (req, res, next) => {
  try {
    const userList = await User.find({}).select('-password')

    res.status(200).json({
      success: true,
      count: userList.length,
      data: userList
    })
  } catch (error) {
    console.log("Error al obtener usuarios", error);
    res.status(400).json({message: 'Error al obtener usuarios'})
}
};

const register = async (req, res, next) => {
  try {
    const {username, password} = req.body;
   
    // Verificar si el nombre de usuario ya existe
    const userDuplicated = await User.findOne({ username });
    if (userDuplicated) {
      return res.status(400).json('Ese vendedor/a ya existe')
    };
    
    const newUser = new User({username, password});
    const userSaved = await newUser.save();
      return res.status(201).json(userSaved);
    } catch (error) {
      console.log("Error al crear un nuevo vendedor/a", error);
      return res.status(400).json('Error al crear un nuevo vendedor/a')
  }
};

const login = async (req, res, next) => {
  try {

    const { username, password } =req.body; 
    const user = await User.findOne({ username });

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
     console.log("Error al iniciar sesión", error);
    return res.status(400).json({ message: 'Error al iniciar sesión'})
  }
};

const updateUser = async (req, res, next) => {
  try {
    // const { id } = req.params
    const existUser = await User.findById(req.user._id)

    if (!existUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    //     // Actualizar campos permitidos
    if (req.body.username) existUser.username = req.body.username
    if (req.body.password) existUser.password = req.body.password
    if (req.body.articles) existUser.articles = req.body.articles

    //     // No permitir cambiar el rol aquí por seguridad

    const updatedUser = await existUser.save()

    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        password: updatedUser.password,
        role: updatedUser.role,
        article: updatedUser.articles
      }
    })
  } catch (error) {
     console.log("Error al actualizar perfil", error);
    res.status(400).json('Error al actualizar perfil')
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)

    if (!userDeleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    // Verificar si es el mismo usuario o un admin
    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== id
    ) {
      return res.status(403).json('No tienes permisos para eliminar este usuario')
    }

    return res.status(200).json({ message: 'Usuario eliminado', userDeleted })
  } catch (error) {
    console.log("Error al eliminar usuario", error);
    return res.status(400).json({ message: 'Error al eliminar usuario'})
  }
};

// Controlador para cambiar rol a admin
const changeRole = async (req, res, next) => {
  try {
    const { id } = req.params
    const userToChange = await User.findById(id)
    if (!userToChange) {
      return res.status(404).json('Cliente no encontrado')
    }
    userToChange.role = 'admin' // Cambiar rol a admin
    await userToChange.save()
    return res.status(200).json({message: "Modificado el rol con éxito"})
  } catch (error) {
    console.log("Error al cambiar el rol", error);
    return res.status(400).json('Error al cambiar rol')
  }
};

module.exports = { getUsers, register, login, updateUser, deleteUser, changeRole};
