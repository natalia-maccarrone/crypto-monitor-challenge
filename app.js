require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const usersRouter = require('./routes/users')
const cryptoRouter = require('./routes/crypto')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/crypto', cryptoRouter)

app.use((req, res) => {
  res.status(404).send('Route was not not found')
})

app.listen(port, () => console.log('Listening...'))

module.exports = app
