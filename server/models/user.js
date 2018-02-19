const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: [true, 'Name is required'],
    unique: true,
    trim: true
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }]

}, {
  timestamps: true,
  usePushEach: true
})

userSchema.plugin(uniqueValidator, {
  message: `{PATH} must be unique`
});

userSchema.index({
  name: 'text',
})
module.exports = mongoose.model('User', userSchema);
