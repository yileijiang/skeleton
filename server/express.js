const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/user.router')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.use('/', userRouter)

module.exports = app