const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ApiError } = require('../errors');
const { statusCodes, tokenTypeEnum } = require('../constants');
const {
  ACCESS_SECRET_WORD,
  REFRESH_SECRET_WORD,
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
  ACTION_TOKEN_SECRET
} = require('../configs/config');

module.exports = {
  hashPassword: (password) => bcrypt.hash(password, 10),
  comparePasswords: async (password, hashPassword) => {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsSame) {
      throw new ApiError('Wrong email or password', 400);
    }
  },

  createAuthTokens: (payload = {}) => {
    const access_token = jwt.sign(payload, ACCESS_SECRET_WORD, { expiresIn: ACCESS_TOKEN_LIFETIME });
    const refresh_token = jwt.sign(payload, REFRESH_SECRET_WORD, { expiresIn: REFRESH_TOKEN_LIFETIME });

    return {
      access_token,
      refresh_token
    };
  },

  createActionToken: (tokenType, payload = {}) => {
    let expiresIn = '1d';

    if (tokenType === tokenTypeEnum.FORGOT_PASSWORD) {
      expiresIn = '7d';
    }

    return jwt.sign(payload, ACTION_TOKEN_SECRET, { expiresIn });
  },

  checkToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
    try {
      let word;

      switch (tokenType) {
        case tokenTypeEnum.ACCESS:
          word = ACCESS_SECRET_WORD;
          break;
        case tokenTypeEnum.REFRESH:
          word = REFRESH_SECRET_WORD;
          break;
        case tokenTypeEnum.FORGOT_PASSWORD:
          word = ACTION_TOKEN_SECRET;
          break;

        default:
          throw new Error('Wrong word');
      }

      return jwt.verify(token, word);
    } catch (e) {
      throw new ApiError('Token not valid', statusCodes.UNAUTHORIZED);
    }
  },
};
