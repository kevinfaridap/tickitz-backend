const { query } = require('express')
const connection = require('../configs/db')

const cinema = {

  // File lama belum pagination (works)
  getCinemas: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cinema', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getCinemaById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cinema WHERE idCinema=?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  insertCinemas: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO cinema SET?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  deleteCinemas: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM cinema WHERE idCinema=?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  updatecinemas: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE cinema SET ? WHERE idCinema=?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = cinema
