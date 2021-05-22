const { json } = require('body-parser')
const ticketResultModels = require('../models/ticketresults')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')
moment.locale('id');

exports.getTicketResult = (req, res) => {
    ticketResultModels.getTicketResults()
      .then((result) => {
        res.json({
          message: 'Success',
          status: 200,
          data: result
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  exports.getTicketResultById = (req, res) => {
    const id = req.params.id
    ticketResultModels.getTicketResultsById(id)
      .then((result) => {
        if (result.length > 0) {
          res.json({
            message: `Succes get data id: ${id}`,
            status: 200,
            data: result
          })
        } else {
          res.json({
            message: 'Id not found !',
            status: 500
          })
        }
      })
  }

exports.insertTicketResult = (req, res) => {
  const {movieTittle, date, time, seatvalues, seatnames, price} = req.body

  const dateNow = new Date()
  const dateFormated = moment(dateNow).format('LL');
  
  const data = {
    id: uuidv4(),
    movieTittle,
    date: dateFormated,
    time,
    seatvalues,
    seatnames,
    price,
    dateTimes: dateNow
  }
  ticketResultModels.insertTicketResults(data)
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

