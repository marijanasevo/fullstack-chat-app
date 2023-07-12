const express = require('express');
const { httpCreateNewUser } = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/', httpCreateNewUser);
// userRouter.post('/login', httpAuthUser);

module.exports = usersRouter;
