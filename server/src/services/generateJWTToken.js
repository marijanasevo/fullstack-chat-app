const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ?? '';
console.log(JWT_SECRET);

function generateJWTToken(id) {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
}

module.exports = { generateJWTToken };
