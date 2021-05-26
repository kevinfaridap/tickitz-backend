const express = require('express')
const router = express.Router()
const ticketResultController = require('../controllers/ticketResults')

router
  .get('/', ticketResultController.getTicketResult)
  .get('/tickethistory/:idUser', ticketResultController.getTicketHistory)
  .get('/:id', ticketResultController.getTicketResultById)
  .post('/', ticketResultController.insertTicketResult)

module.exports = router
