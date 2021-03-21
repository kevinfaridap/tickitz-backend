const connection = require('../configs/db')

const payment = {
  getPayments: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT ticket.ticketMovie, ticket.ticketCategory, ticket.ticketSeat, ticket.ticketCount, ticket.ticketPrice, payment.* FROM ticket INNER JOIN payment ON ticket.id=payment.idPayment;', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getPaymentById: (idPayment) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT ticket.ticketMovie, ticket.ticketCategory, ticket.ticketSeat, ticket.ticketCount, ticket.ticketPrice, payment.* FROM ticket INNER JOIN payment ON ticket.id=payment.idPayment WHERE idPayment= ?', idPayment, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  insertPayment: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO payment SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  updatePayment: (idPayment, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE payment SET ? WHERE idPayment=?', [data, idPayment], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  deletePayment: (idPayment) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM payment WHERE idPayment=?', idPayment, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

}

module.exports = payment
