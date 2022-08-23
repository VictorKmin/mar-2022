const User = require('../dataBase/User')

module.exports = {
  createUser(userObject) {
    return User.create(userObject);
  },

  getAllUsers(filter = {}) {
    return User.find(filter);
  },

  getOneByParams(filter) {
    return User.findOne(filter);
  },

  getOneById(id) {
    return User.findById(id).select(['+cars']).populate('cars');
  },

  updateUserById(userId, newUserObject) {
    return User.findOneAndUpdate({ _id: userId }, newUserObject, { new: true });
  },

  deleteUserById(userId) {
    return User.deleteOne({ _id: userId });
  }
}
