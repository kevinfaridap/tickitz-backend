require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
// const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// ganti versioning jadi pindah ke routers/index
// const routerTickets = require('./src/routers/ticket')
// const routerUsers = require('./src/routers/users')
// const routerPayments = require('./src/routers/payments')
const route = require('./src/routers/index')


app.use(express.urlencoded({ extended: false}))
// parse app JSON
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// router user
// Pake versioning jadi route nya bikin di routers/index.js
// app.use('/tickets', routerTickets)
// app.use('/users', routerUsers)
// app.use('/payments', routerPayments)
app.use('/v1', route)


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
