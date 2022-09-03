const User = require('../modles/user');

const ValidationError = 400;
const ErrorNotFound = 404;
const SeverError = 500;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationError).send({ message: 'Error bad request, a validation error has occured' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'Error not Found') {
        return res.status(ErrorNotFound).send({ message: 'Error not found' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.getOneUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'Error not found') {
        return res.status(ErrorNotFound).send({ message: 'Error not found, there is no user with this Id' });
      }
      return res.status(SeverError).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, { runValidators: true })
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationError).send({ message: 'Error bad request, a validation error has occured' });
      } if (err.name === 'notFoundError') {
        return res.statu(err.statusCode).send({ message: `${err.name} ${err.statusCode} has accured ${err.message}` });
      }
      return res.status(500).send({ message: 'An error has occurred on the server' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar }, { runValidators: true })
    .orFail(() => {
      const error = new Error('no user with that id');
      error.name = 'Error not found';
      error.statusCode = 404;
      throw error;
    })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationError).send({ message: 'Error bad request, a validation error has occured' });
      } if (err.name === 'notFoundError') {
        return res.statu(err.statusCode).send({ message: `${err.name} ${err.statusCode} has accured ${err.message}` });
      }
      return res.status(500).send({ message: 'An error has occurred on the server' });
    });
};
