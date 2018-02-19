const mongoose = require('mongoose');
const gamesController = require('../controllers/games');
const questionsController = require('../controllers/questions');
const router = require('express').Router();

module.exports = router
  .post('/games/create', gamesController.create)
  .get('/games/find', gamesController.find)
  .get('/games', gamesController.index)
  .post('/questions/create', questionsController.create)
  .get('/questions', questionsController.index)
