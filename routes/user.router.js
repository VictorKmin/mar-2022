const { Router } = require('express');

const userController = require("../controllers/user.controller");
const userMdlwr = require("../middlewares/user.middleware");

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMdlwr.checkIsUserBodyValid, userController.createUser);

userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', userController.updateUserById);
userRouter.delete('/:userId', userController.deleteUserByID);

module.exports = userRouter;
