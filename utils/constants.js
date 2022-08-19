const BadRequest = 400;
const NotFound = 404;
const InternalServerError = 500;
const Unauthorized = 401;
const Conflict = 409;
const Forbidden = 403;

const regexUrl = /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/;

module.exports = {
  BadRequest, NotFound, InternalServerError, Unauthorized, Conflict, Forbidden, regexUrl,
};
