const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  }
})

UserSchema.pre('validate', async function(next) {
  const user = this
  user.hashed_password = await user.encryptPassword(user.password)
  next()
})


UserSchema.virtual('password')
  .set(async function(password) {
    this._password = password
  })
  .get(function() {
    return this._password
  })


UserSchema.methods = {
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      const saltRounds = 10
      return bcrypt.hash(password, saltRounds)
    } catch (err) {
      return ''
    }
  }
}

UserSchema.path('hashed_password').validate(
  function(v) {
    if (this._password && this._password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required')
    }
  }, null)

module.exports = mongoose.model('User', UserSchema)