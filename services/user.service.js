const User = require('../dataBase/User')

module.exports = {
  createUser(userObject) {
    return User.create(userObject);
  },

  updateUserById(userId, newUserObject) {
    return User.updateOne({_id: userId}, newUserObject, { new: true })
  },

  deleteUserById(userId) {
    return User.deleteOne({ _id: userId });
  }
}
