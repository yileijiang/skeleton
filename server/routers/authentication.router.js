const express = require('express')
const authenticationController = require('../controllers/authentication.controller')

const authenticationRouter = express.Router()

authenticationRouter.route('/authentication/signin')
  .post(authenticationController.signin)

authenticationRouter.route('/authentication/signout')
  .get(authenticationController.signout)  



module.exports = authenticationRouter