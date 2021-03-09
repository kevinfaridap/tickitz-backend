const paymentModels = require('../models/payments')


exports.getPayment = (req, res) =>{
  paymentModels.getPayments()
  .then((result)=>{
    res.json({
      data:result
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}

exports.getPaymentById = (req, res) =>{
    const idPayment = req.params.idPayment
    paymentModels.getPaymentById(idPayment)
    .then((result)=>{
      res.json({
        data:result
      })
    })
}

exports.insertPayment = (req, res)=>{
    const {payment_Method} = req.body
  
    const data = {
      dateTime: new Date(),
      payment_Method,
    }
    paymentModels.insertPayment(data)
    .then((result)=>{
      res.json({
        data:result
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  exports.updatePayment = (req, res)=>{
    const idPayment = req.params.idPayment
    const {payment_Method} = req.body
  
    const data = {
      dateTime: new Date(),
      payment_Method,
    }
    paymentModels.updatePayment(idPayment, data)
    .then((result)=>{
      res.json({
        data:result
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

exports.deletePayment =  (req, res)=>{
    const idPayment = req.params.idPayment
    paymentModels.deletePayment(idPayment)
    .then((result)=>{
        res.json({
        data: result
        })
    })
    .catch((err)=>{
        console.log(err);
    })     
    
}