const jwt = require('jsonwebtoken');
const { getAuthUser } = require('../models/users/users.model');

async function checkAuth(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await getAuthUser(decoded.id);

      next();
    } catch (e) {
      res
        .status(401)
        .json({ error: "The user isn't authorized, token failed." });
    }
  }

  if (!token) {
    res.status(401).json({ error: "The user isn't authorized, token failed." });
  }
}

module.exports = { checkAuth };
