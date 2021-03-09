const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/tickets')

// router
//   .get('/', ticketController.getTicketById)
//   .get('/:id', ticketController.getTicketById)
//   .post('/', ticketController.insertTicket)
//   .put('/:id', ticketController.updateTicket)
//   .delete('/:idProduct', ticketController.deleteTicket)

router
  .get('/', ticketController.getTicket)
  .get('/:id', ticketController.getTicketById)
  .post('/', ticketController.insertTicket)
  .put('/:id', ticketController.updateTicket)
  .delete('/:id', ticketController.deleteTicket)
// .get('/:ticketmovie', ticketController.searchTicket)
// .get('/sort', ticketController.sortTicket)
// testPagination
// .get('/', ticketController.pageTicket)

module.exports = router
