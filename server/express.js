const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/user.router')
const authenticationRouter = require('./routers/authentication.router')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(cookieParser())

app.use('/', userRouter)
app.use('/', authenticationRouter)

module.exports = app