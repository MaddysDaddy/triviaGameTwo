const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = mongoose.model('User');

module.exports = {
  index(request, response) {

    Game.find({}).sort({
        score: -1
      })
      .populate('_player')
      .then(games => response.json(games))
      .catch(error => console.log(error));
  },
  find(request, response) {
    console.log(request.query);

    const filter = request.params.filter;

    Game.find({
        $text: {
          $search: filter
        }
      }).sort({
        score: -1
      })
      .populate('_player')
      .then(games => response.json(games))
      .catch(error => console.log(error));
  },
  create(request, response) {
    console.log(request.body);
    console.log('Session user', request.session.user);
    User.findById(request.session.user._id)
      .then(user => {
        const game = new Game({
          score: request.body.score,
          percentage: request.body.percentage,
          user: request.body.user
        });
        game._player = user._id;
        user.games.push(game);

        game.save()
          .then(savedGame => {
            response.json(savedGame);

            user.save()
              .then(savedUser => {
                console.log('User saved...');
              })
          })
      })
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        return errors;
      });
  },
  find(request, response) {
    const filter = request.query.filter;

    Game.find({
        $text: {
          $search: filter
        }
      }).sort({
        score: -1
      })
      .populate('User')
      .then(foundUsers => response.json(foundUsers))
      .catch(error => console.log(error));
  }
}
