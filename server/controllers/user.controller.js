const User = require('../models/user.model')
const extend = require('lodash/extend')


const list = async (req, res, next) => {
  try {
    let users = await User.find({}).select('name email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: err.message
    })
  }
}


const create = async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    console.log(user)
    return res.status(200).json({
      message: 'sucessfully created user'
    })
  } catch (err) {
    return res.status(400).json({
      error : err.message
    })
  }
}


const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({
      error: 'could not retrieve user'
    })
  } 
}


const read = (req, res) => {
  req.profile.hashed_password = undefined
  return res.json(req.profile)
}

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.updated = Date.now()
    await user.save()
    user.hashed_password = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      error: err.message
    })
  }
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    res.status(201).json(deletedUser)
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}




module.exports = {
  list,
  create,
  userByID,
  read,
  update,
  remove
}