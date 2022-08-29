const { Router } = require('express');

const { authController } = require('../controllers');
const { userMdlwr, authMdlwr, commonMdlwr } = require('../middlewares');
const { loginUserValidator } = require('../validators/user.validators');

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

module.exports = authRouter;
