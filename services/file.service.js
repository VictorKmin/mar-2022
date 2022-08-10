const usersDb = require('../dataBase')

const filePath = '../dataBase/users.json'

module.exports = {
  insertUser: async (userObject) => {
    // TODO fs.appendFile(filePath, userObject)
  },

  getUsers: async () => {
    return usersDb;
  }
}
