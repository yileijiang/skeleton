const express = require('express')
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')

const userRouter = express.Router()

userRouter.route('/api/users')
  .get(userController.list)
  .post(userController.create)

userRouter.route('/api/users/:userId')
  .get(authController.requireSignin, userController.read)
  .put(authController.requireSignin, authController.hasAuthorization, userController.update)
  .delete(authController.requireSignin, authController.hasAuthorization, userController.remove)


userRouter.param('userId', userController.userByID)

module.exports = userRouter