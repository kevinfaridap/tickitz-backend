const { query } = require('express')
const connection = require('../configs/db')

const movie = {

  countMovies: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS totalData FROM movies ', (err, result) => {
        if (err) {
          reject(new Error('Internal server error'))
        } else {
          resolve(result)
        }
      })
    })
  },

  // getallmovie + search +pagination
  getMovies: (movietittle, offset, limit) => {
    return new Promise((resolve, reject) => {
      // console.log("tittleee",movietittle);
      connection.query(`SELECT * FROM movies WHERE movieTittle LIKE '%${movietittle}%' LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (!err) {
          // console.log(result);
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getSearchMovies: (movietittle) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM movies WHERE movieTittle LIKE ?', `%${movietittle}%`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getSortMovies: (by, order) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM movies ORDER BY ${by} ${order}`, (err, result) => {
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
      connection.query('SELECT * FROM movies WHERE idMovie = ?', idmovie, (err, result) => {
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
      connection.query('INSERT INTO movies SET?', data, (err, result) => {
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
      connection.query('DELETE FROM movies WHERE idMovie=?', idmovie, (err, result) => {
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
      connection.query('UPDATE movies SET ? WHERE idMovie=?', [data, idmovie], (err, result) => {
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

//   updateMovies: (data, idmovie) => {
//     return new Promise((resolve, reject) => {
//       connection.query('UPDATE movies SET ? WHERE idMovie = ?', [data, idmovie], (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   }
// }

//   updateMovies: (data, idmovie) => {
//     return new Promise((resolve, reject) => {
//       connection.query('UPDATE movies SET ? WHERE idMovie = ?', [data, idmovie], (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   }
// }

// PAGINATION (WORKS)
// getPageMovies: (firstData, limit  ) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       "SELECT COUNT(*) AS totalData FROM movies ", (err, result) => {
//         let totalData;
//         if (err) {
//           reject(new Error("Internal server error"));
//         } else {
//           totalData = result[0].totalData;
//           totalPage = Math.ceil(totalData / limit);

//         }
//         connection.query(
//           `SELECT * FROM movies LIMIT ${page}, ${limit} `, (err, result) => {
//             if (err) {
//               reject(new Error("Internal server error"));
//             } else {
//               resolve([{
//                 totalData: totalData,
//                 totalPage: totalPage,
//                 data: result
//               }]);
//             }
//           }
//         );
//       }
//     );
//   });
// },
