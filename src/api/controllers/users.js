const { generateToken } = require('../../utils/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const Article = require('../models/article')

// //  Obtener todos los usuarios

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
};


//  Obtener usuario por ID

// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//       .select('-password')
//       .populate('articles', 'title published createdAt');
    
//     if (user) {
//       res.status(200).json({
//         success: true,
//         data: user
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: 'Usuario no encontrado'
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error al obtener usuario',
//       error: error.message
//     });
//   }
// };

const register = async (req, res, next) => {
  try {
    const { username, password, role, articles } = req.body;

    // Verificar si el nombre de usuario ya existe
    const userDuplicated = await User.findOne({ username })
    if (userDuplicated) {
      return res.status(400).json('Ese nombre de vendedor/a ya existe')
    };

    // Crear un nuevo usuario solo si el nombre de usuario no existe
    const newUser = new User({ username, password, role, articles, role:"user" })
    const userSaved = await newUser.save()
    if (newUser) {
            res.status(201).json({
              success: true,
              data: {
                _id: User._id,
                username: User.username,
                password: User.password,
                role: User.role,
                article: User.article,
                token: generateToken(User._id)
              }
            });
          }
    // return res.status(201).json(userSaved)
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

//     // Verificar si la contraseña coincide
//     const isMatch = await user.comparePassword(password);
    
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Email o contraseña incorrectos'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         _id: user._id,
//         username: user.username,
//         password: user.password,
//         role: user.role,
//         article: user.article,
//         token: generateToken(user._id)
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error al iniciar sesión',
//       error: error.message
//     });
//   }
// };
const updateUser = async (req, res, next) => {
  try {
    // const { id } = req.params
    const user = await user.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    };

//     // Actualizar campos permitidos
    if (req.body.username) user.username = req.body.username;
    if (req.body.password) user.password = req.body.password;
    if (req.body.article) user.article = req.body.article;

//     // No permitir cambiar el rol aquí por seguridad
    
    const updatedUser = await user.save();

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
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar perfil',
      error: error.message
    });
  }
};


const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await user.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    };

        // Verificar si es el mismo usuario o un admin
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este usuario'
      });
    };

    await user.deleteOne();

    return res.status(200).json({ message: 'Usuario eliminado', user })
  } catch (error) {
    return res.status(400).json({ message: 'Error al eliminar usuario', error: error.message })
  }
};

module.exports = { getUsers, register, login, updateUser, deleteUser }
