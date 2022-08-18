const { BadRequest, InternalServerError, Conflict } = require('./constants');

module.exports.handleError = (err, res) => {
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
  res.status(InternalServerError).send({ err, message: 'Что-то пошло не так' });
};
