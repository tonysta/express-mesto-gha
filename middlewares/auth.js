const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(Unauthorized)
      .send({ message: 'Необходима авторизация 1' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(Unauthorized)
      .send(err, { message: 'Необходима авторизация 2' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
