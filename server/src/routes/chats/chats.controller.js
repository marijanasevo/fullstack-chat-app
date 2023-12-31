const {
  getChat,
  createChat,
  getChatById,
  getAllChats,
  createGroupChat,
  renameGroupChat,
  addGroupChatMember,
  removeGroupChatMember,
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

async function httpCreateGroupChat(req, res) {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({
      error: "Can't create a group chat with both group name and users",
    });
  }

  let users = req.body.users;

  if (users.length < 2) {
    return res.status(400).json({
      error: "Can't create a group chat if less than 3 users are participating",
    });
  }

  users.push(req.user);

  try {
    const createdGroupChat = await createGroupChat({
      users,
      groupAdmin: req.user,
      chatName: req.body.name,
    });

    const groupChat = await getChatById(createdGroupChat._id);
    res.json(groupChat);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function httpRenameGroupChat(req, res) {
  const { groupChatId } = req.params;
  const { name } = req.body;

  if (!groupChatId || !name) {
    res
      .status(400)
      .json({ error: 'Missing groupChatId param and/or new group name' });
  }

  try {
    const renamedGroupChat = await renameGroupChat(groupChatId, name);
    res.json(renamedGroupChat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function httpAddGroupChatMember(req, res) {
  const { groupChatId } = req.params;
  const { memberId } = req.body;

  if (!groupChatId || !memberId) {
    res
      .status(400)
      .json({ error: 'Missing groupChatId param and/or new memberId' });
  }

  try {
    const groupChatWithNewMember = await addGroupChatMember(
      groupChatId,
      memberId
    );
    res.json(groupChatWithNewMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function httpRemoveGroupChatMember(req, res) {
  const { groupChatId } = req.params;
  const { memberId } = req.body;

  if (!groupChatId || !memberId) {
    res
      .status(400)
      .json({ error: 'Missing groupChatId param and/or new memberId' });
  }

  try {
    const groupChatWithoutNewMember = await removeGroupChatMember(
      groupChatId,
      memberId
    );
    res.json(groupChatWithoutNewMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  httpGetChat,
  httpGetAllChats,
  httpCreateGroupChat,
  httpRenameGroupChat,
  httpAddGroupChatMember,
  httpRemoveGroupChatMember,
};
