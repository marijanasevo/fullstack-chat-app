const {
  doesUserExist,
  createNewUser,
  matchUserPassword,
  formatUserResponse,
  getAllUsers,
} = require('../../models/users/users.model');

async function httpCreateNewUser(req, res) {
  const { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: `Missing required property to register a user.`,
    });
  }

  if (await doesUserExist(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const user = await createNewUser({ name, email, password, image });

  if (user) {
    return res.status(201).json(user);
  } else {
    return res.status(400).json({ error: 'Failed to Create the User' });
  }
}

async function httpLogin(req, res) {
  const { email, password } = req.body;

  const user = await doesUserExist(email, false);
  const matchPassword = user ? await matchUserPassword(user, password) : null;

  if (user && matchPassword) {
    res.json(formatUserResponse(user));
  } else if (!user) {
    res.status(404).json({ error: 'No such user in our database' });
  } else {
    res.status(403).json({ error: 'Wrong password' });
  }
}

async function httpsGetAllUsers(req, res) {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await getAllUsers(req, keyword);
  res.status(200).json(users);
}

module.exports = { httpCreateNewUser, httpLogin, httpsGetAllUsers };
