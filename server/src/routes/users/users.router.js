const express = require('express');
const {
  httpCreateNewUser,
  httpLogin,
  httpsGetAllUsers,
} = require('./users.controller');
const { checkAuth } = require('../../middleware/authMiddleware');

const usersRouter = express.Router();

usersRouter.post('/', httpCreateNewUser);
usersRouter.get('/', checkAuth, httpsGetAllUsers);
usersRouter.post('/login', httpLogin);

module.exports = usersRouter;
