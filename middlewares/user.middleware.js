const { statusCodes } = require('../constants');

module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    const { age, name } = req.body;

    if (Number.isNaN(+age) || age <= 0) {
      res.status(statusCodes.BAD_REQUEST).json('Wrong user age');
      return;
    }

    if (name.length < 2) {
      res.status(statusCodes.BAD_REQUEST).json('Wrong user name');
      return;
    }

    next();
  }
}
