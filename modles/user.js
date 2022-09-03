const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'User name is required'],
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9 ,.'-]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid name`,
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'User description is required'],
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9 ,.'-]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid description`,
    },
  },
  avatar: {
    type: String,
    required: [true, 'Valid URL is required'],
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
