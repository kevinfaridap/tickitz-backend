const connection = require('../configs/db')

const schedule = {
  getSchedules: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT schedule.time, movies.movieTittle, cinema.cinemaName, cinema.price FROM schedule INNER JOIN movies ON schedule.idMovie = movies.idMovie INNER JOIN cinema ON schedule.idCinema = cinema.idCinema', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getScheduleById: (idmovie) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT schedule.time, movies.movieTittle, cinema.idCinema , cinema.cinemaName, cinema.price, cinema.image FROM schedule INNER JOIN movies ON schedule.idMovie = movies.idMovie INNER JOIN cinema ON schedule.idCinema = cinema.idCinema WHERE schedule.idMovie=? ORDER BY cinema.idCinema ASC`, idmovie, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
      

    })
  },
  
  


//   insertSchedule: (data) => {
//     return new Promise((resolve, reject) => {
//       connection.query('INSERT INTO schedule SET ?', data, (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   },

//   updateSchedule: (idSchedule, data) => {
//     return new Promise((resolve, reject) => {
//       connection.query('UPDATE schedule SET ? WHERE idschedule=?', [data, idSchedule], (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   },

//   deleteschedule: (idSchedule) => {
//     return new Promise((resolve, reject) => {
//       connection.query('DELETE FROM schedule WHERE idschedule=?', idSchedule, (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   }

}

module.exports = schedule
