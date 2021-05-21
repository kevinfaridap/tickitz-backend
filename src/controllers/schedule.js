const scheduleModels = require('../models/schedule')

exports.getSchedule = (req, res) => {
  scheduleModels.getSchedules()
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err) 
    })
}

exports.getScheduleById = (req, res) => {
  // const idSchedule = req.params.idschedule
  const idMovie = req.params.idmovie
  // const idCinema = req.params.idcinema
  scheduleModels.getScheduleById(idMovie)
    .then((result) => {
      res.json({
        data: result
      })
    })
}

// exports.insertSchedule = (req, res) => {
//   const { schedule_Method } = req.body

//   const data = {
//     dateTime: new Date(),
//     schedule_Method
//   }
//   scheduleModels.insertSchedule(data)
//     .then((result) => {
//       res.json({
//         data: result
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// exports.updateSchedule = (req, res) => {
//   const idSchedule = req.params.idSchedule
//   const { schedule_Method } = req.body

//   const data = {
//     dateTime: new Date(),
//     schedule_Method
//   }
//   scheduleModels.updateSchedule(idSchedule, data)
//     .then((result) => {
//       res.json({
//         data: result
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// exports.deleteSchedule = (req, res) => {
//   const idSchedule = req.params.idSchedule
//   scheduleModels.deleteSchedule(idSchedule)
//     .then((result) => {
//       res.json({
//         data: result
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
