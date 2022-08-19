const { statusCodes } = require('../constants');

const { carService, userService } = require("../services");

module.exports = {
  createCar: async (req, res, next) => {
    try {
      const { _id, cars } = req.user;

      const car = await carService.createCar({ ...req.body, user: _id });

      await userService.updateUserById(_id, { cars: [ ...cars, car._id ] });

      res.status(statusCodes.CREATE).json(car);
    } catch (e) {
      next(e);
    }
  },

  getCarById: async (req, res, next) => {
    try {
      const { car } = req;

      res.json(car);
    } catch (e) {
      next(e);
    }
  },

  updateCarById: async (req, res, next) => {
    try {
      const { carId } = req.params;

      const car = await carService.updateCarById(carId, req.body);

      res.json(car);
    } catch (e) {
      next(e);
    }
  },

  deleteCarByID: async (req, res, next) => {
    try {
      const { carId } = req.params;

      await carService.deleteCarById(carId);

      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  }
}
