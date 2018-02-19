const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  score: {
    type: String,
    default: "0",
  },
  percentage: {
    type: String,
    default: "0",
  },
  _player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  usePushEach: true
})

gameSchema.index({
  score: 'text',
  percentage: 'text',
  user: 'text'
});
module.exports = mongoose.model('Game', gameSchema);
