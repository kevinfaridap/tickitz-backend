const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const verifyrole = require('../middlewares/verifyrole')
const auth = require('../middlewares/auth')

router
  .get('/', auth.verifyAccess, verifyrole.verify() ,userController.getUser)
  .get('/:idUser', auth.verifyAccess, verifyrole.verify(), userController.getUserById)
  .post('/', auth.verifyAccess, verifyrole.verify(), userController.insertUser)
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .put('/:idUser',auth.verifyAccess, verifyrole.verify(), userController.updateUser)
  .delete('/:idUser',auth.verifyAccess, verifyrole.verify(), userController.deleteUser)

module.exports = router
