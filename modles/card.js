const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9 ,.'-]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid name`,
    },
    required: [true, 'Card Title is required'],
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(v);
      },
      message: (props) => `${props.value} is not a valid url`,
    },
    required: [true, 'Valid URL is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
