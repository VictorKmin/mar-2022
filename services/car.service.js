const { Car } = require('../dataBase');

module.exports = {
  createCar(carObject) {
    return Car.create(carObject);
  },

  getOneByParams(filter) {
    return Car.findOne(filter);
  },

  getOneById(id) {
    return Car.findById(id).populate('user');
  },

  updateCarById(carId, newCarObject) {
    return Car.updateOne({ _id: carId }, newCarObject, { new: true });
  },

  deleteCarById(carId) {
    return Car.deleteOne({ _id: carId });
  }
}
