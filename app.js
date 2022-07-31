const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const bodyParser = require('body-parser');

const app = express();

const {
  PORT = 3000
} = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  req.user = {
    _id: '62e3c2ab0787a55c6601eac6'
  };

  next();
});

app.use('/', usersRoute);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});