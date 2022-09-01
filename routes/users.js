const usersRouter = require('express').Router();
const path = require('path');

const User = require('../modles/user');
const { createUser } = require('../controllers/user');


usersRouter.get('/users', (req, res) => {
  User.find({}).catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
});

usersRouter.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      const parsedUsersData = JSON.parse(users);
      const reqUser = parsedUsersData.find((user) => user._id === req.params.id);
      if (!reqUser) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.send(reqUser);
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
});

usersRouter.post('/users', createUser);

module.exports = usersRouter;
