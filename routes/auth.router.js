const { Router } = require('express');

const { authController } = require('../controllers');
const { userMdlwr, authMdlwr, commonMdlwr } = require('../middlewares');
const { loginUserValidator, userEmailValidator, userPasswordValidator } = require('../validators/user.validators');
const { tokenTypeEnum } = require('../constants');

const authRouter = Router();

authRouter.post(
  '/login',
  commonMdlwr.checkIsBodyValid(loginUserValidator),
  userMdlwr.getUserDynamicaly('body', 'email'),
  authController.login
);

authRouter.post(
  '/logout',
  authMdlwr.checkIsAccessToken,
  authController.logout
);

authRouter.post(
  '/refresh',
  authMdlwr.checkIsRefreshToken,
  authController.refresh
);

authRouter.post(
  '/password/forgot',
  commonMdlwr.checkIsBodyValid(userEmailValidator),
  userMdlwr.getUserDynamicaly('body', 'email'),
  authController.forgotPassword
);

authRouter.put(
  '/password/forgot',
  commonMdlwr.checkIsBodyValid(userPasswordValidator),
  authMdlwr.checkActionToken(tokenTypeEnum.FORGOT_PASSWORD),
  authMdlwr.checkPreviousPassword,
  authController.setNewPasswordForgot
);

module.exports = authRouter;
