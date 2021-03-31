const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payments')
const auth = require('../middlewares/auth')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router
  // auth dihilangkan sementara untuk frontend
  // .get('/', auth.verifyAccess, paymentController.getPayment)
  .get('/', paymentController.getPayment)

  .get('/:idPayment', paymentController.getPaymentById)
  .post('/', upload.single('image'), paymentController.insertPayment)
  .put('/:idPayment', paymentController.updatePayment)
  .delete('/:idPayment', paymentController.deletePayment)

module.exports = router
