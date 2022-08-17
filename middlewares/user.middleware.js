const { ApiError } = require('../errors');
const { BAD_REQUEST } = require("../constants/statusCode.enum");

module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    try {
      const { age, name } = req.body;

      if (Number.isNaN(+age) || age <= 0) {
        throw new ApiError('Wrong user age', BAD_REQUEST);
      }

      if (name.length < 2) {
        throw new ApiError('Wrong user name', BAD_REQUEST);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}
