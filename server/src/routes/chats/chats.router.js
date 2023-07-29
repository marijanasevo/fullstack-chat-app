const express = require('express');
const chats = require('../../../data/chats');
const { checkAuth } = require('../../middleware/authMiddleware');

const { httpGetChat, httpGetAllChats } = require('./chats.controller');

const chatsRouter = express.Router();

chatsRouter.get('/', checkAuth, httpGetAllChats);
chatsRouter.post('/', checkAuth, httpGetChat);

// const groupChatsRouter = express.Router();

// chatsRouter.use('/group', groupChatsRouter);

// groupChatsRouter.post('/', checkAuth, httpCreateGroupChat);
// groupChatsRouter.put('/:chatId', checkAuth, httpRenameGroupChat);
// groupChatsRouter.delete(
//   '/:chatId/members/:memberId',
//   checkAuth,
//   httpRemoveGroupChatMember
// );

chatsRouter.get('/:id', (req, res) => {
  const chatId = req.params.id;
  const chat = chats.find(chat => chat._id === chatId);
  res.send(chat);
});

module.exports = chatsRouter;
