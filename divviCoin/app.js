const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const proxy = require('proxy-middleware')
const url = require('url')
const session = require('cookie-session')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')

require('dotenv').config()
const app = express()
const charities = require('./routes/charities')
const ads = require('./routes/ads')
const user = require('./routes/accounts')

app.use(bodyParser.json({ limit: '50mb', parameterLimit: '100000' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: '100000' }))

app.use(cors())
app.use('/assets', proxy(url.parse('http://localhost:8081/app')))
app.get('*', (req, res, next) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(session({
  name: 'session',
  keys: ['abcd', 'efgh']
}))

app.use('/users', user)
app.use('/charities', charities)
app.use('/ads', ads)

const server = new WebpackDevServer(webpack(config), {
  contentBase: __dirname,
  hot: true,
  quiet: false,
  noInfo: false,
  publicPath: '/assets/',

  stats: { colors:true }
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err.message)
})

server.listen(8081, 'localhost', function () {})
app.listen(8080, () => {
  console.log(`Listening on port: 8080`)
})

module.exports = app
