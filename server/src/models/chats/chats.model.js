const chats = require('./chats.mongo');

async function getChat(authUserId, partnerUserId) {
  return await chats
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: authUserId } } },
        { users: { $elemMatch: { $eq: partnerUserId } } },
      ],
    })
    .populate('users', '-password')
    .populate('latestMessage');
}

async function getChatById(chatId) {
  return await chats.findById({ _id: chatId }).populate('users', '-password');
}

async function createChat(chatData) {
  return chats.create(chatData);
}

module.exports = { getChat, createChat, getChatById };
