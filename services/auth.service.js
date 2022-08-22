const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ApiError } = require("../errors");

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  comparePasswords: async (password, hashPassword) => {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsSame) {
      throw new ApiError('Wrong email or password', 400);
    }
  },

  createAuthTokens: (payload = {}) => {
    const access_token = jwt.sign(payload, 'ACCESS_WORD', { expiresIn: '15m' });
    const refresh_token = jwt.sign(payload, 'REFRESH_WORD', { expiresIn: '30d' });

    return {
      access_token,
      refresh_token
    }
  }
}
