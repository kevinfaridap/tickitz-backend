const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payments')

router
  .get('/', paymentController.getPayment)
  .get('/:idPayment', paymentController.getPaymentById)
  .post('/', paymentController.insertPayment)
  .put('/:idPayment', paymentController.updatePayment)
  .delete('/:idPayment', paymentController.deletePayment)

module.exports = router
