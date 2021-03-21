const express = require('express')
const route = express.Router()
const routePayment = require('./payments')
const routeTicket = require('./ticket')
const routeUsers = require('./users')

route.use('/tickets', routeTicket)
route.use('/users', routeUsers)
route.use('/payments', routePayment)

module.exports = route