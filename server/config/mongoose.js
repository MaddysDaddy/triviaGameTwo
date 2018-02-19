const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.connect('mongodb://localhost/trivia_game_two');
mongoose.connection.on('connected', () => console.log('Connected to mongo!'));

modelsPath = path.join(__dirname, './../models');

fs.readdirSync(modelsPath).forEach(model => {
  if (model.indexOf('.js')) {
    require(path.join(modelsPath, model));
  }
})

mongoose.Promise = global.Promise;
