const {
  doesUserExist,
  createNewUser,
} = require('../../models/users/users.model');

async function httpCreateNewUser(req, res) {
  const { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: `Missing required property to register a user.` });
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

module.exports = { httpCreateNewUser };
