const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleError } = require('../middlewares/handleError');
const { NotFound } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
    .catch((err) => handleError(err, res));
};

module.exports.getUserMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(NotFound).send({ message: 'Такого пользователя не существует' });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(NotFound).send({ message: 'Такого пользователя не существует' });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => User.findById(user._id))
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(NotFound).send({ message: 'Такого пользователя не существует' });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(NotFound).send({ message: 'Такого пользователя не существует' });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          'some-secret-key',
          { expiresIn: '7d' },
        );
        res.send({ token });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
};
