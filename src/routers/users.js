const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')


router
  .get('/', userController.getUser)
  .get('/:idUser', userController.getUserById)
  .post('/', userController.insertUser)
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .put('/:idUser', userController.loginUser)
  .delete('/:idUser', userController.deleteUser)

module.exports = router
