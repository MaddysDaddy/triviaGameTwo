const mongoose = require('mongoose');
const Question = mongoose.model('Question');

module.exports = {
  create(request, response) {
    Question.create(request.body)
      .then(question => response.json(question))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        console.log(errors);
      });
  },
  index(request, response) {
    console.log('getting 3 questions...');
    Question.aggregate()
      .sample(3)
      .then(randomQuestions => response.json(randomQuestions))
      .catch(error => {
        console.log('Error: ', error.message);
      });
  }
}
