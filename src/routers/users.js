const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const verifyrole = require('../middlewares/verifyrole')
const auth = require('../middlewares/auth')
const { uploadMulter } = require('../middlewares/multer')

router
  // .get('/', auth.verifyAccess, verifyrole.verify(), userController.getUser)
  .get('/', userController.getUser)
  
  // auth dan role dimatikan sementara untuk frontend
  // .get('/:idUser', auth.verifyAccess, verifyrole.verify(), userController.getUserById)
  .get('/:email', userController.getUserByEmail)
  .get('/:idUser', userController.getUserById)
  .put('/verify', userController.verifyUser)
  .post('/', auth.verifyAccess, verifyrole.verify(), userController.insertUser)
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  
  // auth dan role dimatikan sementara untuk front end
  // .put('/:idUser', auth.verifyAccess, verifyrole.verify(), userController.updateUser)
  .put('/updateimage',uploadMulter.single('image'), userController.updateImg)
  .put('/:idUser', userController.updateUser)

  .delete('/:idUser', auth.verifyAccess, verifyrole.verify(), userController.deleteUser)

module.exports = router
