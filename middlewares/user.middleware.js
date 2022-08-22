const { ApiError } = require('../errors');
const { statusCodes } = require("../constants");
const { userService } = require('../services');
const User = require('../dataBase/User');

module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    try {
      const { age, name } = req.body;

      if (Number.isNaN(+age) || age <= 0) {
        return next(new ApiError('Wrong user age', statusCodes.BAD_REQUEST));
      }

      if (name.length < 2) {
        return next(new ApiError('Wrong user name', statusCodes.BAD_REQUEST));
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsUserEmailUniq: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { userId } = req.params;

      const userByEmail = await userService.getOneByParams({ email });

      if (userByEmail && userByEmail._id.toString() !== userId) {
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
      console.log(from, 'FROM')
      console.log(filedName, 'filedName')
      console.log(dbField, 'dbField')
      try {
        const filedToSearch = req[from][filedName];

        console.log(filedToSearch, 'filedToSearch');

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
