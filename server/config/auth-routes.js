const mongoose = require('mongoose');
const usersController = require('../controllers/users');
const router = require('express').Router();

module.exports = router
  .post('/login', usersController.login)
  .delete('/logout', usersController.logout)
  .get('/user', usersController.user)
