const {
  BadRequest, InternalServerError, Conflict, Unauthorized, NotFound,
} = require('../utils/constants');

module.exports.handleError = (err, req, res, next) => {
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
  if (err.statusCode === 404) {
    res.status(NotFound).send({ message: err.message });
    return;
  }
  res.status(InternalServerError).send({ message: 'Что-то пошло не так' });
};
