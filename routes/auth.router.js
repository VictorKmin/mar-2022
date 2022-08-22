const { Router } = require('express');

const { authController } = require('../controllers')
const { userMdlwr } = require('../middlewares')

const authRouter = Router();

authRouter.post(
  '/login',
  userMdlwr.getUserDynamicaly('body', 'email'),
  authController.login
);

// authRouter.post(
//   '/refresh',
// )

module.exports = authRouter;
