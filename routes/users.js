const {
  getUsers,
  getUser,
  createUser
} = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:userId', getUser);

usersRouter.post('/users', createUser);

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

module.exports = usersRouter;