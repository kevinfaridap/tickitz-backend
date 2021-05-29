const express = require('express')
const router = express.Router()
const scheduleController = require('../controllers/schedule')
const auth = require('../middlewares/auth')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router
  // auth dihilangkan sementara untuk frontend
  // .get('/', auth.verifyAccess, scheduleController.getschedule)
  .get('/', scheduleController.getSchedule)
  .get('/:idmovie', scheduleController.getScheduleById)
//   .post('/', upload.single('image'), scheduleController.insertschedule)
//   .put('/:idschedule', scheduleController.updateschedule)
//   .delete('/:idschedule', scheduleController.deleteschedule)

module.exports = router
