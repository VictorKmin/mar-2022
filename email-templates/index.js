const { emailActionEnum } = require('../constants');

module.exports = {
  [emailActionEnum.WELCOME]: {
    subject: 'WELCOME',
    templateName: 'welcome'
  },

  [emailActionEnum.ORDER_ARRIVED]: {
    subject: 'OREDR ARR',
    templateName: 'order_arrived'
  },

  [emailActionEnum.FORGOT_PASSWORD]: {
    subject: 'Opps. Dont wory',
    templateName: 'forgot-pass'
  }
};
