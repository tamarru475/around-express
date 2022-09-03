const usersRouter = require('express').Router();
const {
  createUser, getUsers, getOneUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

usersRouter.post('/users', createUser);

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:id', getOneUser);

usersRouter.patch('/users/me', updateUserInfo);

usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
