const express = require('express')
const authController = require('../controllers/auth.controller')

const authRouter = express.Router()

authRouter.route('/auth/signin')
  .post(authController.signin)

authRouter.route('/auth/signout')
  .get(authController.signout)  



module.exports = authRouter