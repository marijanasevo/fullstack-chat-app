const users = require('./users.mongo');
const { generateJWTToken } = require('../../services/generateJWTToken');

async function doesUserExist(email) {
  const resp = await users.findOne({ email });
  return resp;
}

async function createNewUser(user) {
  try {
    const resp = await users.create(user);

    return {
      name: resp.name,
      email: resp.email,
      password: resp.password,
      id: resp._id,
      token: generateJWTToken(resp._id),
    };
  } catch (error) {
    console.log('Failed adding new user: ' + error);
  }
}

module.exports = {
  doesUserExist,
  createNewUser,
};
