const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleError } = require('../utils/handleError');
const { NotFound } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
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
    password,
    email,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send({
      data: user,
    }))
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
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // аутентификация успешна
      return res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      // возвращаем ошибку аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};
