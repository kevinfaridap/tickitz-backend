const connection = require('../configs/db')

const ticket = {
  getTickets: (ticketmovie) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM ticket WHERE ticketMovie LIKE ?', `%${ticketmovie}%`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  // sortTickets:()=>{
  //     return new Promise((resolve, reject)=>{
  //         connection.query('SELECT * FROM ticket ORDER BY ticketDate DESC', (err, result)=>{
  //             if(!err){
  //                 resolve(result)
  //             } else{
  //                 reject(err)
  //             }
  //         })
  //     })
  // },

  getTicketById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM ticket WHERE id=?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  // :()=>{
  //     return new Promise((resolve, reject)=>{

  //             if(!err){
  //                 resolve(result)
  //             } else{
  //                 reject(err)
  //             }
  //         })
  //     })

  // },

  // searchTicket:(ticketmovie)=>{
  //     return new Promise((resolve, reject)=>{
  //         connection.query('SELECT * FROM ticket WHERE ticketMovie LIKE? ', `%${ticketmovie}%` ,(err, result)=>{
  //             if(!err){
  //                 resolve(result)
  //             } else{
  //                 reject(err)
  //             }
  //         })
  //     })

  // },

  insertTicket: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO ticket SET?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  deleteTicket: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM ticket WHERE id=?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  updateTicket: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE ticket SET ? WHERE id=?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = ticket
