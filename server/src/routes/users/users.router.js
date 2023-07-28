const express = require('express');
const {
  httpCreateNewUser,
  httpLogin,
  httpsGetAllUsers,
} = require('./users.controller');
const { protect } = require('../../middleware/authMiddleware');

const usersRouter = express.Router();

usersRouter.post('/', httpCreateNewUser);
usersRouter.get('/', protect, httpsGetAllUsers);
usersRouter.post('/login', httpLogin);

module.exports = usersRouter;
