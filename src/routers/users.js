const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router
  .get('/', userController.getUser)
  .get('/:idUser', userController.getUserById)
  .post('/', userController.insertUser)
  .put('/:idUser', userController.updateUser)
  .delete('/:idUser', userController.deleteUser)

module.exports = router
