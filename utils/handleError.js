const { BadRequest, InternalServerError } = require('./constants');

module.exports.handleError = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(BadRequest).send({ message: err.message });
    return;
  }
  if (err.name === 'CastError') {
    res.status(BadRequest).send({ message: 'Объект не найден' });
    return;
  }
  res.status(InternalServerError).send({ message: 'Что-то пошло не так' });
};
