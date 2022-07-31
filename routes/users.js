const user = require('../models/user');

const usersRouter = require('express').Router();

usersRouter.get('/users', (req, res) => {

});

usersRouter.get('/users/:userId', (req, res) => {

});

usersRouter.post('/users', (req, res) => {
  console.log(req);
  const {name, about, avatar} = req.body;

  user.create({name, about, avatar});
});

module.exports = usersRouter;