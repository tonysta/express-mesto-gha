const {
  getCards,
  createCard,
  deleteCard
} = require('../controllers/cards');

const cardRouter = require('express').Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);

module.exports = cardRouter;