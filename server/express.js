const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/user.router')
const authRouter = require('./routers/auth.router')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(cookieParser())

app.use('/', userRouter)
app.use('/', authRouter)

module.exports = app