const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { NotFound } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

const {
  PORT = 3000,
} = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.use((req, res) => {
  res.status(NotFound).send({ message: 'Cтраницы не существует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
