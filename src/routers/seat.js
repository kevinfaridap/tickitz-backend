const express = require('express')
const router = express.Router()
const seatController = require('../controllers/seat')
// const auth = require('../middlewares/auth')
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

router
  .get('/getbycategory/:seatcategory', seatController.getSeat)

  .get('/:idmovie', seatController.getSeatById)
//   .post('/', upload.single('image'), scheduleController.insertschedule)
//   .put('/:idschedule', scheduleController.updateschedule)
//   .delete('/:idschedule', scheduleController.deleteschedule)

module.exports = router
