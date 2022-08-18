const { ApiError } = require('../errors');
const { statusCodes } = require("../constants");
const { carService } = require('../services');

module.exports = {
  checkIsCarBodyValid: async (req, res, next) => {
    try {

      // if (Number.isNaN(+age) || age <= 0) {
      //   return next(new ApiError('Wrong car age', statusCodes.BAD_REQUEST));
      // }
      //
      // if (name.length < 2) {
      //   return next(new ApiError('Wrong car name', statusCodes.BAD_REQUEST));
      // }

      next();
    } catch (e) {
      next(e);
    }
  },

  isCarPresent: async (req, res, next) => {
    try {
      const { carId } = req.params;

      const car = await carService.getOneById(carId);

      if (!car) {
        return next(new ApiError('Car not found', statusCodes.NOT_FOUND));
      }

      req.car = car;
      next();
    } catch (e) {
      next(e);
    }
  }
}
