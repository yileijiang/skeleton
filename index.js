const app = require('./server/express')
const config = require('./config/config')
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.listen(config.PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`server started on port ${config.PORT}`)
})

