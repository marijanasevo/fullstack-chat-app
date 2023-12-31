const express = require('express');
const chats = require('../../../data/chats');
const { checkAuth } = require('../../middleware/authMiddleware');

const {
  httpGetChat,
  httpGetAllChats,
  httpCreateGroupChat,
  httpRenameGroupChat,
  httpAddGroupChatMember,
  httpRemoveGroupChatMember,
} = require('./chats.controller');

const chatsRouter = express.Router();

chatsRouter.get('/', checkAuth, httpGetAllChats);
chatsRouter.post('/', checkAuth, httpGetChat);

const groupChatsRouter = express.Router();
chatsRouter.use('/group', groupChatsRouter);

groupChatsRouter.post('/', checkAuth, httpCreateGroupChat);
groupChatsRouter.put('/:groupChatId', checkAuth, httpRenameGroupChat);
groupChatsRouter.post(
  '/:groupChatId/members',
  checkAuth,
  httpAddGroupChatMember
);
groupChatsRouter.delete(
  '/:groupChatId/members',
  checkAuth,
  httpRemoveGroupChatMember
);
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
