const Unauthorized = 401;

const regexUrl = /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/;

module.exports = {
  Unauthorized, regexUrl,
};
