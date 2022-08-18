const { Router } = require('express');

const { carController } = require('../controllers');
const { commonMdlwr, carMdlwr, userMdlwr } = require('../middlewares');

const carRouter = Router();

carRouter.post(
    '/',
    commonMdlwr.checkIsIdValid('userId', 'query'),
    carMdlwr.checkIsCarBodyValid,
    userMdlwr.isUserPresent('query'),
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
    carMdlwr.isCarPresent,
    carController.updateCarById
);
carRouter.delete(
    '/:carId',
    commonMdlwr.checkIsIdValid('carId'),
    carMdlwr.isCarPresent,
    carController.deleteCarByID
);

module.exports = carRouter;
