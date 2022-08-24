const { ApiError } = require('../errors');
const { statusCodes } = require("../constants");
const { userService } = require('../services');
const User = require('../dataBase/User');
const userValidators = require('../validators/user.validators');

module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    try {
      const validate = userValidators.newUserValidator.validate(req.body);

      if (validate.error) {
        return next(new ApiError(validate.error.message, statusCodes.BAD_REQUEST));
      }

      req.body = validate.value;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsUserEmailUniq: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { userId } = req.params;

      const userByEmail = await userService.getOneByParams({ email, _id: { $ne: userId } });

      if (userByEmail) {
        return next(new ApiError('User with this email is exist', statusCodes.CONFLICT));
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserPresent: (from = 'params') => {
    return async function (req, res, next) {
      try {
        const { userId } = req[from];

        const user = await userService.getOneById(userId);

        if (!user) {
          return next(new ApiError('User not found', statusCodes.NOT_FOUND));
        }

        req.user = user;
        next();
      } catch (e) {
        next(e);
      }
    }
  },

  getUserDynamicaly: (from = 'body', filedName = 'userId', dbField = filedName) => {
    return async function (req, res, next) {
      try {
        const filedToSearch = req[from][filedName];

        const user = await User.findOne({ [dbField]: filedToSearch })

        if (!user) {
          return next(new ApiError('User not found', statusCodes.NOT_FOUND));
        }

        req.user = user;
        next();
      } catch (e) {
        next(e);
      }
    }
  }
}
