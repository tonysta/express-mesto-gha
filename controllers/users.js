const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({
      data: users,
    }))
    .catch((err) => res.status(500).send(`message: ${err.message}`));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({
      user,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send(`message: ${err.message}`);
      } else {
        res.status(500).send(`message: ${err.message}`);
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(`message: ${err.message}`);
      } else {
        res.status(500).send(`message: ${err.message}`);
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(`message: ${err.message}`);
      } else {
        res.status(500).send(`message: ${err.message}`);
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(`message:${err.message}`);
      } else {
        res.status(500).send(`message:${err.message}`);
      }
    });
};
