const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/movies')
const auth = require('../middlewares/auth')
const {uploadMulter} = require('../middlewares/multer')
const {cacheAllMovies} = require('../middlewares/redis')

router
  .get('/', auth.verifyAccess, cacheAllMovies, moviesController.getMovie)
  .get('/search', moviesController.getSearchMovie)
  .get('/sort', moviesController.getSortMovie)
  .get('/page',auth.verifyAccess, cacheAllMovies, moviesController.getPageMovie)
  .get('/:idmovie', moviesController.getMovieById)
  .post('/', uploadMulter.single('image') ,moviesController.insertMovie)
  .put('/:idmovie', moviesController.updateMovie)
  .delete('/:idmovie', moviesController.deleteMovie)


module.exports = router