const card = require("../models/card");

module.exports.getCards = (req, res) => {
  card.find({})
    .then(cards => res.send({
      data: cards
    }))
    .catch(() => res.status(500).send({
      message: 'ошибка'
    }))
};

module.exports.createCard = (req, res) => {
  const {
    name,
    link
  } = req.body;
  const userId = req.user._id;

  card.create({
      name,
      link,
      owner: userId
    })
    .then(card => res.send({
      data: card
    }))
    .catch((err) => res.status(500).send({
      message: `${err}`
    }))
};

module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({
      data: card
    }))
    .catch(() => res.status(500).send({
      message: 'ошибка'
    }))
}

module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
      req.params.cardId, {
        $addToSet: {
          likes: req.user._id
        }
      }, // добавить _id в массив, если его там нет
      {
        new: true
      },
    )
    .then((card) => res.send({
      data: card
    }))
    .catch((err) => res.status(500).send({
      message: `${err}`
    }))
}

module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
      req.params.cardId, {
        $pull: {
          likes: req.user._id
        }
      }, // убрать _id из массива
      {
        new: true
      },
    )
    .then((card) => res.send({
      data: card
    }))
    .catch((err) => res.status(500).send({
      message: `${err}`
    }))
};