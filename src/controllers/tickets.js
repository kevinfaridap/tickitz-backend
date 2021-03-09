const { json } = require('body-parser')
const ticketModels = require('../models/tickets')

exports.getTicket = (req, res) => {
  const searchMovie = req.query.ticketmovie || ''
  ticketModels.getTickets(searchMovie)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

// TEST PAGINATION
// exports.pageTicket = (req, res) => {
//   const currentPage = req.query.page || 1;
//   const perPage = req.query.perPage || 5;
//   let totalItems;

//   // Menghitung data yang dimiliki
//   ticketModels.find()
//   .countDocuments()
//   .then(count=>{
//     totalItems = count;
//     return ticketModels.find()
//     .skip((parseInt(currentPage)-1) * parseInt(perPage))
//     .limit(parseInt (perPage));
//   })
//   .then(result =>{
//     res.json({
//       data: result,
//       totalData: totalItems,
//       per_Page: parseInt(perPage),
//       current_Page: parseInt(currentPage)
//     })
//   })
//   .catch(err =>{
//     next(err);
//   })
// }

exports.sortTicket = (req, res) => {
  const ticketSort = req.query.sort
  ticketModels.sortTickets(ticketSort)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.searchTicket = (req, res) => {
  const ticketMovie = req.query.ticketmovie
  ticketModels.searchTicket(ticketMovie)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getTicketById = (req, res) => {
  const idTicket = req.params.id
  ticketModels.getTicketById(idTicket)
    .then((result) => {
      res.json({
        data: result
      })
    })
}

exports.insertTicket = (req, res) => {
  const ticketMovie = req.body.ticketMovie
  const ticketCategory = req.body.ticketCategory
  const ticketSeat = req.body.ticketSeat
  const ticketCount = req.body.ticketCount
  const ticketPrice = req.body.ticketPrice

  const data = {
    ticketMovie,
    ticketCategory,
    ticketSeat,
    ticketDate: new Date(),
    ticketCount,
    ticketPrice
  }
  ticketModels.insertTicket(data)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.updateTicket = (req, res) => {
  const idTicket = req.params.id
  const { ticketMovie, ticketCategory, ticketSeat, ticketCount, ticketPrice } = req.body

  const data = {
    ticketMovie,
    ticketCategory,
    ticketSeat,
    ticketDate: new Date(),
    ticketCount,
    ticketPrice
  }
  ticketModels.updateTicket(idTicket, data)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.deleteTicket = (req, res) => {
  const idTicket = req.params.id
  ticketModels.deleteTicket(idTicket)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
