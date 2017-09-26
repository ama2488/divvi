const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile.js')[env]
const knex = require('knex')(config)

module.exports = knex
