module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/default-mar-db',

  ACCESS_SECRET_WORD: process.env.ACCESS_SECRET_WORD || 'ACCESS_WORD',
  REFRESH_SECRET_WORD: process.env.REFRESH_SECRET_WORD || 'REFRESH_WORD',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '5m',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '30d'
};
