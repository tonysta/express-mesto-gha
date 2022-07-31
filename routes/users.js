const {
  getUsers,
  getUser,
  createUser
} = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:userId', getUser);

usersRouter.post('/users', createUser);

module.exports = usersRouter;