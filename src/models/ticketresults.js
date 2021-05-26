const { query } = require('express')
const connection = require('../configs/db')

const ticketResults = {


    getTicketResults: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ticketresults `, (err, result) => {
                if (!err) {
                resolve(result)
                } else {
                reject(err)
                }
            })
        })
    },

    getTicketHistorys: (idUser) => {
      return new Promise((resolve, reject) => {
          connection.query(`SELECT * FROM ticketresults WHERE idUser = '${idUser}' ORDER BY dateTimes DESC LIMIT 0,3 `, (err, result) => {
              if (!err) {
              resolve(result)
              } else {
              reject(err)
              }
          })
      })
  },
    
    getTicketResultsById: (id) => {
        return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ticketresults WHERE id=?`, id, (err, result) => {
            if (!err) {
            resolve(result)
            } else {
            reject(err)
            }
        })
        })
    },

  insertTicketResults: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO ticketresults SET?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
}

module.exports = ticketResults
