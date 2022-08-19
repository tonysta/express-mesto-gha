const Card = require('../models/card');
const { handleError } = require('../middlewares/handleError');
const { NotFound, Forbidden } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({
      data: cards,
    }))
    .catch((err) => handleError(err, res));
};

module.exports.createCard = (req, res) => {
  const {
    name,
    link,
  } = req.body;
  const userId = req.user._id;

  Card.create({
    name,
    link,
    owner: userId,
  })
    .then((card) => res.send({
      data: card,
    }))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NotFound).send({ message: 'Такой карточки не существует' });
      }
      if (card.owner.toString() !== req.user._id) {
        return res.status(Forbidden).send({ message: 'Эту карту создали не вы' });
      }
      card.remove();
      return res.send({ card });
    })
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    }, // добавить _id в массив, если его там нет
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(NotFound).send({ message: 'Такой карточки не существует' });
      }
    })
    .catch((err) => handleError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    }, // убрать _id из массива
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(NotFound).send({ message: 'Такой карточки не существует' });
      }
    })
    .catch((err) => handleError(err, res));
};
