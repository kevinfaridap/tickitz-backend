require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const routerTickets = require('./src/routers/ticket')
const routerUsers = require('./src/routers/users')
const routerPayments = require('./src/routers/payments')

// parse app JSON
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

// router user
app.use('/tickets', routerTickets)
app.use('/users', routerUsers)
app.use('/payments', routerPayments)
app.use('*', (req, res, next) => {
  const error = new Error('ERROR.........')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500
  }
  res.json({
    message: err.message,
    status_error: err.status
  })
})

app.listen(port, () => {
  console.log('Server berjalan di port ' + port)
})

// app.post('/products', (req, res)=>{
//   // res.send('hello ini product method post')
//   console.log(req.body);
//   const name = req.body.name
//   const description = req.body.description
//   const price = req.body.price

//   res.json({
//     name: name,
//     description: description,
//     price: price
//   })
// })

// coba header
// app.get('/user/:idUserbaru', (req, res)=>{
//   const idUser = req.params.idUserbaru
//   const cobaHeader = req.headers.cobaheader
//   res.send(cobaHeader)
// })

// Ngirim dari url biasa
// app.get('/test', (req, res) =>{
//     res.send('hello sadsadasdsad');
// })
