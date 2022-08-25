const Joi = require('joi');

const { MONGO_ID } = require('../constants/regex.enum');

const IDValidator = Joi.string().regex(MONGO_ID);


module.exports = {
  IDValidator
};
