var debug = require('debug')('auth:server')
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var helmet = require('helmet')

var app = express()

app.use(helmet()) // security headers
app.use(helmet.noCache({ noEtag: true })) // disable caching
app.use(cors()) // enable CORS
app.use(bodyParser.json())

app.post('/', require('./routes/auth'))

// error middleware
app.use(function (err, req, res, next) {
  debug(err)
  res.sendStatus(500)
})

module.exports = app
