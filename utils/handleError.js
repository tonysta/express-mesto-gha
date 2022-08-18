const {
  BadRequest, InternalServerError, Conflict, Unauthorized,
} = require('./constants');

module.exports.handleError = (err, res) => {
  console.log('>>>', err);
  if (err.name === 'ValidationError') {
    res.status(BadRequest).send({ message: err.message });
    return;
  }
  if (err.name === 'CastError') {
    res.status(BadRequest).send({ message: 'Объект не найден' });
    return;
  }
  if (err.code === 11000) {
    res.status(Conflict).send({ message: 'Email уже используется' });
    return;
  }
  if (err.statusCode === 401) {
    res.status(Unauthorized).send({ message: err.message });
    return;
  }
  res.status(InternalServerError).send({ message: 'Что-то пошло не так' });
};
