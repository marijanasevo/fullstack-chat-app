const express = require('express');
const { httpCreateNewUser, httpLogin } = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/', httpCreateNewUser);
usersRouter.post('/login', httpLogin);

module.exports = usersRouter;
