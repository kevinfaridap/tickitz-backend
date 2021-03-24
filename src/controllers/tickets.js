const { json } = require('body-parser')
const ticketModels = require('../models/tickets')

// TEST PAGINATION ( WORKS)
exports.getPageTicket = (req, res) => {
  const firstData = req.query.firstData || 0
  const limit = req.query.limit || 5

  ticketModels.getPageTickets(firstData, limit)
    .then((result) => {
      res.json({
        message: 'Success',
        status: 200,
        data: result
        // totalData: totalData,
        // totalPage: totalPage
      })
    })
    .catch((err) => {
      res.json({
        err: err + 'Error Cant Get Data',
        status: 400
      })
    })
}

// File lama sebelum pagination(works)
exports.getTicket = (req, res) => {
  const searchMovie = req.query.ticketmovie || ''
  ticketModels.getTickets(searchMovie)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: 'Success',
          status: 200,
          data: result
        })
      } else {
        res.json({
          err: 'Data not found',
          status: 400
        })
      }
    })
    .catch((err) => {
      res.json({
        err: err + 'Error Cant Get Data',
        status: 400
      })
    })
}

exports.getSearchTicket = (req, res) => {
  const searchMovie = req.query.ticketmovie || ''
  ticketModels.getSearchTickets(searchMovie)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: 'Success',
          status: 200,
          data: result
        })
      } else {
        res.json({
          err: 'Data not found',
          status: 400
        })
      }
    })
    .catch((err) => {
      res.json({
        err: err + 'Error Cant Get Data',
        status: 400
      })
    })
}

exports.getSortTicket = (req, res) => {
  // const by = req.query.by ? req.query.by : "id";
  // const order = req.query.order ? req.query.order : "ASC";
  const by = req.query.by || 'id'
  const order = req.query.order || 'ASC'
  ticketModels.getSortTickets(by, order)
    .then((result) => {
      res.json({
        message: 'Success',
        status: 200,
        data: result
      })
    })
    .catch((err) => {
      res.json({
        err: err + 'Error Cant Get Data',
        status: 400
      })
    })
}

exports.getTicketById = (req, res) => {
  const idTicket = req.params.id
  ticketModels.getTicketById(idTicket)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: 'Ini data dari id = ' + idTicket,
          data: result
        })
      } else {
        res.json({
          err: 'Cannot find data id = ' + idTicket,
          status: 400
        })
      }
    })
    .catch((err) => {
      console.log(err)
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
        message: 'Success Insert Data',
        status: 200,
        data: data
      })
    })
    .catch((err) => {
      res.json({
        err: 'Failed Insert Data' + '  ' + err,
        status: 400
      })
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
      if (result.changedRows !== 0) {
        res.json({
          message: 'Success update data',
          status: 200,
          data: data
        })
      } else {
        res.json({
          err: 'No Id in database',
          status: 500
        })
      }
    })
    .catch((err) => {
      res.json({
        err: 'No data in databse' + '   ' + err,
        status: 500
      })
    })
}

exports.deleteTicket = (req, res) => {
  const idTicket = req.params.id
  ticketModels.deleteTicket(idTicket)
    .then((result) => {
      if (result.affectedRows !== 0) {
        res.json({
          message: `Success delete id ${idTicket} !`
          // data: result
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
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

// exports.sortTicket = (req, res) => {
//   const ticketSort = req.query.sort
//   ticketModels.sortTickets(ticketSort)
//     .then((result) => {
//       res.json({
//         data: result
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// exports.searchTicket = (req, res) => {
//   const ticketMovie = req.query.ticketmovie
//   ticketModels.searchTicket(ticketMovie)
//     .then((result) => {
//       res.json({
//         data: result
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
