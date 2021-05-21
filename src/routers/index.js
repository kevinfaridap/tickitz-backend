const express = require('express')
const route = express.Router()
const routePayment = require('./payments')
const routeTicket = require('./ticket')
const routeUsers = require('./users')
const routeMovies = require('./movies')
const routeShowMovies = require('./showmovie')
const routeCinema = require('./cinema')
const routeSchedule = require('./schedule')
const routeSeat = require('./seat')

route.use('/tickets', routeTicket)
route.use('/users', routeUsers)
route.use('/payments', routePayment)
route.use('/movies', routeMovies)
route.use('/showmovies', routeShowMovies)
route.use('/cinema', routeCinema)
route.use('/schedule', routeSchedule)
route.use('/seat', routeSeat)


module.exports = route
