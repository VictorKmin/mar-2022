const { Router } = require('express');

const { carController } = require('../controllers');
const { commonMdlwr, carMdlwr, authMdlwr } = require('../middlewares');
const { newCarValidator, updateCarValidator } = require('../validators/car.validators');

const carRouter = Router();

carRouter.post(
  '/',
  commonMdlwr.checkIsBodyValid(newCarValidator),
  authMdlwr.checkIsAccessToken,
  carController.createCar
);

carRouter.get(
  '/:carId',
  commonMdlwr.checkIsIdValid('carId'),
  carMdlwr.isCarPresent,
  carController.getCarById
);
carRouter.put(
  '/:carId',
  commonMdlwr.checkIsIdValid('carId'),
  commonMdlwr.checkIsBodyValid(updateCarValidator),
  authMdlwr.checkIsAccessToken,
  carMdlwr.isCarPresent,
  carController.updateCarById
);
carRouter.delete(
  '/:carId',
  commonMdlwr.checkIsIdValid('carId'),
  authMdlwr.checkIsAccessToken,
  carMdlwr.isCarPresent,
  carController.deleteCarByID
);

module.exports = carRouter;
