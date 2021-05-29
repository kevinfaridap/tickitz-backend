const express = require('express')
const router = express.Router()
const showMoviesController = require('../controllers/showmovie')
const auth = require('../middlewares/auth')
const { uploadMulter } = require('../middlewares/multer')
// const { cacheAllMovies, clearAllMovies } = require('../middlewares/redis')
const verifyrole = require('../middlewares/verifyrole')

router
  // Di comment sementara u/ edit frontend 
  // .get('/', auth.verifyAccess, cacheAllMovies, showMoviesController.getMovie)

  .get('/', showMoviesController.getMovie)
  .get('/sort', showMoviesController.getSortMovie)

  // .get('/', auth.verifyAccess, showMoviesController.getMovie)
  .get('/:idmovie', showMoviesController.getMovieById)
  .post('/', auth.verifyAccess, verifyrole.verify(), uploadMulter.single('image'),  showMoviesController.insertMovie)
  .put('/:idmovie', auth.verifyAccess, verifyrole.verify(), uploadMulter.single('image'),  showMoviesController.updateMovie)
  .delete('/:idmovie', auth.verifyAccess, verifyrole.verify(),  showMoviesController.deleteMovie)
  
  // .post('/', auth.verifyAccess, verifyrole.verify(), uploadMulter.single('image'), clearAllMovies, showMoviesController.insertMovie)
  // .put('/:idmovie', auth.verifyAccess, verifyrole.verify(), uploadMulter.single('image'), clearAllMovies, showMoviesController.updateMovie)
  // .delete('/:idmovie', auth.verifyAccess, verifyrole.verify(), clearAllMovies, showMoviesController.deleteMovie)

module.exports = router
