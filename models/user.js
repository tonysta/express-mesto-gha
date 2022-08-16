const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Необходимо ввести 2 или более символов, вы ввели {VALUE}'],
    maxlength: [30, 'Необходимо ввести 30 или менее символов, вы ввели {VALUE}'],
  },
  about: {
    default: 'Исследователь',
    type: String,
    minlength: [2, 'Необходимо ввести 2 или более символов, вы ввели {VALUE}'],
    maxlength: [30, 'Необходимо ввести 30 или менее символов, вы ввели {VALUE}'],
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'неверный формат email',
    },
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
