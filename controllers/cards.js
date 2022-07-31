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

  card.create({
      name,
      link
    })
    .then(card => res.send({
      data: card
    }))
    .catch(() => res.status(500).send({
      message: 'ошибка'
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

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки