const express = require('express')
const route = express.Router()
const routePayment = require('./payments')
const routeTicket = require('./ticket')
const routeUsers = require('./users')
const routeMovies = require('./movies')

route.use('/tickets', routeTicket)
route.use('/users', routeUsers)
route.use('/payments', routePayment)
route.use('/movies', routeMovies)

module.exports = route