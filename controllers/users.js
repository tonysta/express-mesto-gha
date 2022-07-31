const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then(users => res.send({
      data: users
    }))
    .catch(() => res.status(500).send({
      message: 'ошибка'
    }));
};

module.exports.getUser = (req, res) => {
  user.findById(req.params.userId)
    .then(user => res.send({
      user
    }))
    .catch(() => res.status(500).send({
      message: 'ошибка'
    }))
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar
  } = req.body;

  user.create({
    name,
    about,
    avatar
  });
};