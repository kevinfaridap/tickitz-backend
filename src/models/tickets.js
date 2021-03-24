const { query } = require('express')
const connection = require('../configs/db')

const ticket = {

  // PAGINATION (WORKS)
  getPageTickets: (firstData, limit) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS totalData FROM ticket ', (err, result) => {
          let totalData
          if (err) {
            reject(new Error('Internal server error'))
          } else {
            totalData = result[0].totalData
            totalPage = Math.ceil(totalData / limit)
          }
          connection.query(
            `SELECT * FROM ticket LIMIT ${firstData}, ${limit} `, (err, result) => {
              if (err) {
                reject(new Error('Internal server error'))
              } else {
                resolve([{
                  totalData: totalData,
                  totalPage: totalPage,
                  data: result
                }])
              }
            }
          )
        }
      )
    })
  },

  // File lama belum pagination (works)
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

  getSearchTickets: (ticketmovie) => {
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

  getSortTickets: (by, order) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ticket ORDER BY ${by} ${order}`, (err, result) => {
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
