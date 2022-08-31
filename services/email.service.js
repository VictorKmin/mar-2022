const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { NO_REPLY_EMAIL, NO_REPLY_PASSWORD, FRONTEND_URL } = require('../configs/config');
const emailTemplatesObj = require('../email-templates');
const ApiError = require('../errors/ApiError');

const sendEmail = async (userMail, emailAction, locals = {}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: NO_REPLY_EMAIL,
      pass: NO_REPLY_PASSWORD
    }
  });

  const templateParser = new EmailTemplates({
    views: {
      root: path.join(process.cwd(), 'email-templates')
    }
  });

  const emailInfo = emailTemplatesObj[emailAction];

  if (!emailInfo) {
    throw new ApiError('Wrong template name', 500);
  }

  const html = await templateParser.render(emailInfo.templateName, { ...locals, frontendURL: FRONTEND_URL });

  return transporter.sendMail({
    from: 'No reply mar-2022',
    to: userMail,
    subject: emailInfo.subject,
    html
  });
};

module.exports = {
  sendEmail
};
