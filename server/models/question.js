const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  text: {
    type: String,
    minLength: 15
  },
  correct_answer: {
    type: String,
    trim: true,
    required: [true, 'Correct answer must be provided.']
  },
  fake_answer_1: {
    type: String,
    trim: true,
    required: [true, 'Fake answer 1 must be provided.']
  },
  fake_answer_2: {
    type: String,
    trim: true,
    required: [true, 'Fake answer 2 must be provided.']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema);
