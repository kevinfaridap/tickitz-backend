const userModels = require('../models/users')

exports.getUser = (req, res) => {
  userModels.getUsers()
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getUserById = (req, res) => {
  const idUser = req.params.idUser
  userModels.getUserById(idUser)
    .then((result) => {
      res.json({
        data: result
      })
    })
}

exports.insertUser = (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    firstName,
    lastName,
    email,
    phoneNumber
  }
  userModels.insertUser(data)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.updateUser = (req, res) => {
  const idUser = req.params.idUser
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    firstName,
    lastName,
    email,
    phoneNumber
  }
  userModels.updateUser(idUser, data)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.deleteUser = (req, res) => {
  const idUser = req.params.idUser
  userModels.deleteUser(idUser)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
