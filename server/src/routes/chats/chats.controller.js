const {
  getChat,
  createChat,
  getChatById,
  getAllChats,
} = require('../../models/chats/chats.model');
const { getLatestMessageSender } = require('../../models/users/users.model');

async function httpGetChat(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ error: 'userId param missing in your request' });
  }

  let chat = await getChat(req.user._id, userId);
  // chat = await getLatestMessageSender(chat);

  if (chat.length > 0) {
    res.json(chat[0]);
  } else {
    let chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await createChat(chatData);
      const chat = await getChatById(createdChat._id);
      res.json(chat);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

async function httpGetAllChats(req, res) {
  try {
    let chats = await getAllChats(req.user._id);
    // chats = await getLatestMessageSender(chats);
    res.json(chats);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { httpGetChat, httpGetAllChats };
