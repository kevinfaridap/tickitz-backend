const express = require('express')
const router = express.Router()
const cinemaController = require('../controllers/cinema')
const { uploadMulter } = require('../middlewares/multer')

router
  .get('/', cinemaController.getCinema)
//   .get('/search', cinemaController.getSearchCinema)
//   .get('/sort', cinemaController.getSortCinema)
//   .get('/page', cinemaController.getPageCinema)
  .get('/:id', cinemaController.getCinemaById)
  .post('/', cinemaController.insertCinema)
  .put('/:id', uploadMulter.single('image'), cinemaController.updateCinema)
  .delete('/:id', cinemaController.deleteCinema)


module.exports = router
