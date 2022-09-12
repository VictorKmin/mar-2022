const { Router } = require('express');

const { userController } = require('../controllers');
const { authMdlwr, fileMdlwr, commonMdlwr, userMdlwr } = require('../middlewares');
const { newUserValidator, updateUserValidator } = require('../validators/user.validators');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post(
  '/',
  commonMdlwr.checkIsBodyValid(newUserValidator),
  userMdlwr.checkIsUserEmailUniq,
  userController.createUser
);

userRouter.get(
  '/:userId',
  commonMdlwr.checkIsIdValid('userId'),
  userMdlwr.isUserPresent(),
  userController.getUserById
);

userRouter.post(
  '/:userId/avatar',
  commonMdlwr.checkIsIdValid('userId'),
  fileMdlwr.checkUploadedAvatar,
  userMdlwr.isUserPresent(),
  userController.uploadAvatar
);

userRouter.put(
  '/:userId',
  commonMdlwr.checkIsIdValid('userId'),
  commonMdlwr.checkIsBodyValid(updateUserValidator),
  authMdlwr.checkIsAccessToken,
  userMdlwr.isUserPresent(),
  userMdlwr.checkIsUserEmailUniq,
  userController.updateUserById
);
userRouter.delete(
  '/:userId',
  commonMdlwr.checkIsIdValid('userId'),
  authMdlwr.checkIsAccessToken,
  userMdlwr.isUserPresent(),
  userController.deleteUserByID
);

module.exports = userRouter;
