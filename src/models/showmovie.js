const { query } = require('express')
const connection = require('../configs/db')

const movie = {

  countMovies: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS totalData FROM nowshowingmovies ', (err, result) => {
        if (err) {
          reject(new Error('Internal server error'))
        } else {
          resolve(result)
        }
      })
    })
  },

  // getallmovie + search +pagination
  getMovies: (movietittle, offset, limit, by, order) => {
    return new Promise((resolve, reject) => {
      // console.log("tittleee",movietittle);
      connection.query(`SELECT * FROM nowshowingmovies WHERE tittleMovie LIKE '%${movietittle}%' ORDER BY ${by} ${order} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (!err) {
          // console.log(result);
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getSortMovies: (by, order) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM nowshowingmovies ORDER BY ${by} ${order}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },


  getMoviesById: (idmovie) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM nowshowingmovies WHERE id = ?', idmovie, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  insertMovies: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO nowshowingmovies SET?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  deleteMovies: (idmovie) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM nowshowingmovies WHERE id=?', idmovie, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  updateMovies: (idmovie, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE nowshowingmovies SET ? WHERE id=?', [data, idmovie], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
module.exports = movie
