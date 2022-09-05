const cron = require('node-cron');

const removeOldOAuthTokens = require('./removeOldOAuthTokens');

module.exports = () => {
  cron.schedule('0 4 * * *', removeOldOAuthTokens);
};
