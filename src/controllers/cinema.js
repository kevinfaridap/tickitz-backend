const { json } = require('body-parser')
const cinemaModels = require('../models/cinema')


exports.getCinema = (req, res) => {
  cinemaModels.getCinemas()
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

exports.getCinemaById = (req, res) => {
  const idcinema = req.params.id
  cinemaModels.getCinemaById(idcinema)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data id: ${idcinema}`,
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


exports.insertCinema = (req, res) => {
  if (!req.file) {
    const err = new Error('You must upload the image!')
    err.errorStatus = 200
    throw err
  }

  const cinemaName = req.body.cinemaName
  const cinemaAddress = req.body.cinemaAddress
  const price = req.body.price
  
  const data = {
    cinemaName,
    cinemaAddress,
    price,
    image: `http://localhost:8000/image/${req.file.filename}`,
  }
  cinemaModels.insertCinemas(data)
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

exports.updateCinema = (req, res) => {

  if (!req.file) {
    const err = new Error('You must upload the image!')
    err.errorStatus = 200
    throw err
  }

  const cinemaName = req.body.cinemaName
  const cinemaAddress = req.body.cinemaAddress
  const price = req.body.price
  const idcinema = req.params.id
  
  const data = {
    cinemaName,
    cinemaAddress,
    price,
    image: `http://localhost:8000/image/${req.file.filename}`,
  }
  cinemaModels.updatecinemas(idcinema, data)
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

exports.deleteCinema = (req, res) => {
  const idcinema = req.params.id
  cinemaModels.deleteCinemas(idcinema)
    .then((result) => {
      if (result.affectedRows !== 0) {
        res.json({
          message: `Success delete id ${idcinema} !`
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
