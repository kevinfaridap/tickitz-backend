const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/movies')
const auth = require('../middlewares/auth')
const { uploadMulter } = require('../middlewares/multer')
const { cacheAllMovies } = require('../middlewares/redis')

router
  // REDIS pindah kemana?disesuaikan dengan kebutuhan
  // .get('/', auth.verifyAccess, cacheAllMovies, moviesController.getMovie)
  
  // auth di hilangkan sementara untuk frontend
  // .get('/', auth.verifyAccess, moviesController.getMovie)
  .get('/', moviesController.getMovie)

  .get('/search', moviesController.getSearchMovie)
  .get('/sort', moviesController.getSortMovie)
  // pagination di gabung ke getallmovie
  // .get('/page',auth.verifyAccess, cacheAllMovies, moviesController.getPageMovie)
  .get('/:idmovie', moviesController.getMovieById)
  .post('/',auth.verifyAccess, uploadMulter.single('image'), moviesController.insertMovie)
  .put('/:idmovie', uploadMulter.single('image'), moviesController.updateMovie)
  .delete('/:idmovie', moviesController.deleteMovie)

module.exports = router
