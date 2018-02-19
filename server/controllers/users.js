const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  index(request, response) {
    User.find({}).sort({
        score: -1
      })
      .then(users => response.json(users))
      .catch(error => console.log(error))
  },
  login(request, response) {
    User.findOneAndUpdate({
        name: request.body.name
      }, request.body, {
        upsert: true,
        new: true
      })
      .then(user => {
        completeLogin(request, response, user);
        console.log('User logged in...');
      })
      .catch(error => console.log(error));
  },
  logout(request, response) {
    const user = request.session.user;

    request.session.destroy();
    response.clearCookie('userID');
    response.clearCookie('expiration');

    response.json(user);
  },
  user(request, response) {
    User.findById(request.session.user._id)
      .then(user => response.json(user))
      .catch(error => console.log(error));
  },
  update(request, response) {
    User.findByIdAndUpdate(request.session.user._id, request.body)
      .then(updatedUser => response.json(updatedUser))
      .catch(error => console.log(error));
  },
  find(request, response) {
    const filter = request.query.filter;

    User.find({
        $text: {
          $search: filter
        }
      }).sort({
        score: -1
      })
      .then(foundUsers => response.json(foundUsers))
      .catch(error => console.log(error));
  }
}

function completeLogin(request, response, user) {
  request.session.user = user.toObject();

  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 50000 * 1000);

  response.json(user || true);
}
