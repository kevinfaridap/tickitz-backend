const connection = require('../configs/db')

const seat = {
  getSeats: (seatCategory) => {
    return new Promise((resolve, reject) => {
    console.log(seatCategory); 
      connection.query(`SELECT * FROM seat WHERE seatCategory ='${seatCategory}'`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  
  UpdatedSoldSeats: (seatnames) => {
    return new Promise((resolve, reject) => {
    console.log(seatnames, 'isi naaaa'); 
      connection.query(`UPDATE seat SET seatStatus = 'Sold' WHERE seatName =${seatnames}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

//   getSeatsById: (idmovie) => {
//     return new Promise((resolve, reject) => {
//       connection.query(`SELECT seat.time, movies.movieTittle, cinema.idCinema , cinema.cinemaName, cinema.price, cinema.image FROM seat INNER JOIN movies ON seat.idMovie = movies.idMovie INNER JOIN cinema ON seat.idCinema = cinema.idCinema WHERE seat.idMovie=? ORDER BY cinema.idCinema ASC`, idmovie, (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   },
  
}
module.exports = seat
