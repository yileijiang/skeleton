const express = require('express')
const userController = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.route('/api/users')
  .get(userController.list)
  .post(userController.create)

userRouter.route('/api/users/:userId')
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove)


userRouter.param('userId', userController.userByID)

module.exports = userRouter