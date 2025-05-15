const express = require('express');
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getUsers, register, login, updateUser, deleteUser, changeRole} = require('../controllers/User');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.post('/register', register);
usersRoutes.post('/login', login);
usersRoutes.put('/:id', isAuth, updateUser);
usersRoutes.delete('/:id', [isAuth, isAdmin], deleteUser);
usersRoutes.put("/change-role/:id", isAuth, changeRole);

module.exports = usersRoutes;
