const users = require('./users.mongo');
const { generateJWTToken } = require('../../services/generateJWTToken');

async function doesUserExist(email, format = true) {
  const resp = await users.findOne({ email });
  if (!format || !resp) return resp;
  return formatUserResponse(resp);
}

async function createNewUser(user) {
  try {
    const resp = await users.create(user);
    return formatUserResponse(resp);
  } catch (error) {
    console.log('Failed adding new user: ' + error);
  }
}

function formatUserResponse(user) {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    id: user._id,
    token: generateJWTToken(user._id),
  };
}

async function matchUserPassword(user, password) {
  return await user.matchPassword(password);
}

module.exports = {
  doesUserExist,
  createNewUser,
  matchUserPassword,
  formatUserResponse,
};
