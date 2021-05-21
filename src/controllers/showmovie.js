const { json } = require('body-parser')
const showMoviesModels = require('../models/showmovie')
const redis = require('redis')
const client = redis.createClient(6379)

// GetAllMovie + Search + Pagination
exports.getMovie = async (req, res) => {
  const by = req.query.by || 'id'
  const order = req.query.order || 'ASC'
  const searchMovie = req.query.movietittle || ''
  const limit = parseInt(req.query.limit) || 5
  const page = parseInt(req.query.page) || 1
  
  const countMovies = await showMoviesModels.countMovies()
  // console.log(req.query.limit);
  // console.log(req.query.movietittle);
  const totalData = countMovies[0].totalData
  const totalPage = Math.ceil(totalData / limit)
  const offset = (page - 1) * limit

  
  showMoviesModels.getMovies(searchMovie, offset, limit, by, order)

    .then((result) => {
      if (result.length > 0) {
        // console.log(result);
        const dataMovie = result
        client.setex('getAllNowShowingMovies', 60 * 60 * 12, JSON.stringify(dataMovie))
        res.json({
          message: 'Success',
          status: 200,
          currentPage: page,
          Items: totalPage,
          totalMovies: totalData,
          MaxperPage: limit,
          data: result
        })
      } else {
        res.json({
          err: 'Data not found',
          status: 400
        })
      }
    })
    .catch((err) => {
      res.json({
        err: err + 'Error Cant Get Data',
        status: 400
      })
    })
}


exports.getSortMovie = (req, res) => {
  const by = req.query.by || 'id'
  const order = req.query.order || 'ASC'
  showMoviesModels.getSortMovies(by, order)
    .then((result) => {
      res.json({
        message: 'Success',
        status: 200,
        data: result
      })
    })
    .catch((err) => {
      res.json({
        err: err + 'Error Cant Get Data',
        status: 400
      })
    })
}






exports.getMovieById = (req, res) => {
  const idMovie = req.params.idmovie
  showMoviesModels.getMoviesById(idMovie)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: 'Ini data dari id = ' + idMovie,
          data: result
        })
      } else {
        res.json({
          err: 'Cannot find data id = ' + idMovie,
          status: 400
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.insertMovie = (req, res) => {
  if (!req.file) {
    const err = new Error('You must upload the image!')
    err.errorStatus = 400
    throw err
  }

  const { tittleMovie, genreMovie, directMovie, castsMovie, durationMovie, synopsisMovie } = req.body

  const data = {
    tittleMovie,
    genreMovie,
    directMovie,
    castsMovie,
    releaseDate: new Date(),
    durationMovie,
    synopsisMovie,
    image: `http://localhost:8000/image/${req.file.filename}`
  }
  showMoviesModels.insertMovies(data)
    .then((result) => {
      res.json({
        message: 'Success Insert Data',
        status: 200,
        data: data
      })
    })
    .catch((err) => {
      res.json({
        err: 'Failed Insert Data' + '  ' + err,
        status: 400
      })
    })
}

exports.updateMovie = (req, res) => {
  // console.log(req.file.filename);
  if (!req.file) {
    const err = new Error('You must upload the image!')
    err.errorStatus = 200
    throw err
  }

  const idMovie = req.params.idmovie
  const { tittleMovie, genreMovie, directMovie, castsMovie, durationMovie, synopsisMovie } = req.body
  const data = {
    tittleMovie,
    genreMovie,
    directMovie,
    castsMovie,
    releaseDate: new Date(),
    durationMovie,
    synopsisMovie,
    image: `http://localhost:8000/image/${req.file.filename}`
  }
  // console.log(data);
  showMoviesModels.updateMovies(idMovie, data)
    .then((result) => {
      if (result.changedRows !== 0) {
        res.json({
          message: 'Success update data',
          status: 200,
          data: data
        })
      } else {
        res.json({
          err: 'No Id in database',
          status: 500
        })
      }
    })
    .catch((err) => {
      res.json({
        err: 'No data in databse' + '   ' + err,
        status: 500
      })
    })
}

exports.deleteMovie = (req, res) => {
  const idMovie = req.params.idmovie
  showMoviesModels.deleteMovies(idMovie)
    .then((result) => {
      if (result.affectedRows !== 0) {
        res.json({
          message: `Success delete id ${idMovie} !`
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
