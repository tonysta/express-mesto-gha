const usersRouter = require('express').Router();

const {
  getUsers,
  getUserMe,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserMe);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
