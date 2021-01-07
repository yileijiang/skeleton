const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('./../../config/config')

const bcrypt = require('bcrypt')


const signin = async (req, res) => {
  try {
    let user = await User.findOne({'email': req.body.email})
    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      })
    }

    const autheticateBoolean = await user.authenticate(req.body.password)
    if (!autheticateBoolean) {
      return res.status(401).send({
        error: 'Email and password don\'t match'
      })
    }

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET)

    res.cookie('token', token, { expire: new Date() + 9999})

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    return res.status(401).json({
      error: 'Could not sign in'
    })
  }
}


const signout = (req, res) => {
  res.clearCookie('token')
  return res.status(200).json({
    message: 'signed out'
  })
}


module.exports = {
  signin,
  signout
}