const chats = require('./chats.mongo');

async function getAllChats(authUserId) {
  return await chats
    .find({ users: { $elemMatch: { $eq: authUserId } } })
    .populate('users', '-password')
    .populate('groupAdmin', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });
}

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
  return await chats
    .findById({ _id: chatId })
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
}

async function createChat(chatData) {
  return chats.create(chatData);
}

async function createGroupChat({ chatName, users, groupAdmin }) {
  return await chats.create({
    users,
    chatName,
    groupAdmin,
    isGroupChat: true,
  });
}

async function renameGroupChat(groupChatId, name) {
  return await chats.findByIdAndUpdate(
    groupChatId,
    {
      chatName: name,
    },
    {
      new: true,
    }
  );
}

async function addGroupChatMember(groupChatId, memberId) {
  return await chats
    .findByIdAndUpdate(
      groupChatId,
      {
        $push: { users: memberId },
      },
      { new: true }
    )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
}

async function removeGroupChatMember(groupChatId, memberId) {
  return await chats
    .findByIdAndUpdate(
      groupChatId,
      {
        $pull: { users: memberId },
      },
      { new: true }
    )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');
}

module.exports = {
  getChat,
  getChatById,
  getAllChats,
  createChat,
  createGroupChat,
  renameGroupChat,
  addGroupChatMember,
  removeGroupChatMember,
};
