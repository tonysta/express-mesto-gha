// const {
//   BadRequest, InternalServerError, Conflict, Unauthorized, NotFound,
// } = require('../utils/constants');
// const { ConflictError } = require('./conflictError');

// module.exports.handleError = (err, req, res, next) => {
//   if (err.name === 'ValidationError') {
//     res.status(BadRequest).send({ message: err.message });
//     return;
//   }
//   if (err.name === 'CastError') {
//     res.status(BadRequest).send({ message: 'Объект не найден' });
//     return;
//   }
//   if (err.code === 11000) {
//     next(new ConflictError('email уже используется'));
//   }
//   if (err.statusCode === 401) {
//     res.status(Unauthorized).send({ message: err.message });
//     return;
//   }
//   if (err.statusCode === 404) {
//     res.status(NotFound).send({ message: err.message });
//     return;
//   }
//   res.status(InternalServerError).send({ message: 'Что-то пошло не так' });
// };

module.exports.handleError = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
