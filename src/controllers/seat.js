const { json } = require('body-parser')
const seatModels = require('../models/seat')


exports.getSeat = (req, res) => {
  const seatCategory = req.params.seatcategory
  seatModels.getSeats(seatCategory)
    .then((result) => {
      res.json({
        message: 'Success',
        status: 200,
        result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getSeatById = (req, res) => {
  const idSeat = req.params.id
  seatModels.getSeatsById(idSeat)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data id: ${idseat}`,
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


