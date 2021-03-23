const { json } = require('body-parser')
const moviesModels = require('../models/movies')
const redis = require('redis')
const client = redis.createClient(6379)



// GetAllMovie + Search + Pagination
exports.getMovie = async (req, res) => {
  const searchMovie = req.query.movietittle || ''
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const countMovies = await moviesModels.countMovies()
  // console.log(req.query.limit);
  // console.log(req.query.movietittle);
  const totalData = countMovies[0].totalData;
  const totalPage = Math.ceil(totalData / limit);
  const offset = (page - 1) * limit
  moviesModels.getMovies(searchMovie, offset, limit)
  
  .then((result) => {
    if (result.length>0){
        // console.log(result);
        // const dataMovie = result
        // client.setex("getAllMovies", 60 * 60 * 12, JSON.stringify(dataMovie))
        res.json({
          message: 'Success',
          status : 200,
          currentPage: page,
          Items: totalPage,
          totalMovies: totalData, 
          MaxperPage: limit,
          data: result,
        })
      } else{
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

exports.getSearchMovie = (req, res) => {
  const searchMovie = req.query.movietittle || ''
  moviesModels.getSearchMovies(searchMovie)
    .then((result) => {
      if (result.length>0){
        res.json({
          message: 'Success',
          status : 200,
          data: result
        })
      } else{
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
  const by = req.query.by || "id";
  const order = req.query.order || "ASC";
  moviesModels.getSortMovies(by, order)
    .then((result) => {
      res.json({
          message: 'Success',
          status : 200,
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
  moviesModels.getMoviesById(idMovie)
    .then((result) => {
      if (result.length>0){
        res.json({
          message: 'Ini data dari id = ' + idMovie,
          data: result
        })
      } else{
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

  if(!req.file){
    const err = new Error('You must upload the image!');
    err.errorStatus= 400;
    throw err;
  }

  const { movieTittle, genre, directedBy, duration, casts, synopsis } = req.body

  const data = {
    movieTittle,
    genre,
    directedBy,
    releaseDate: new Date(),
    duration,
    casts,
    image: `http://localhost:8000/image/${req.file.filename}`,
    synopsis
  }
  moviesModels.insertMovies(data)
    .then((result) => {
      res.json({ 
        message: 'Success Insert Data',
        status: 200,
        data: data
      })
    })
    .catch((err) => {
      res.json({
        err: 'Failed Insert Data'+ "  " + err,
        status: 400
      })
    })
}

exports.updateMovie = (req, res) => {
  // console.log(req.file.filename);
  if(!req.file){
    const err = new Error('You must upload the image!');
    err.errorStatus= 400;
    throw err;
  }

  const idMovie = req.params.idmovie
  const { movieTittle, genre, directedBy, duration, casts, synopsis } = req.body
  const data = {
    movieTittle,
    genre,
    releaseDate: new Date(),
    directedBy,
    duration,
    image: `http://localhost:8000/image/${req.file.filename}`,
    casts,
    synopsis
  }
  // console.log(data);
  moviesModels.updateMovies(idMovie, data)
    .then((result) => {
      if(result.changedRows !== 0){
        res.json({
          message: 'Success update data',
          status: 200,
          data: data
        })
      }else{
        res.json({
          err: 'No Id in database',
          status: 500
        })
      }
    })
    .catch((err) => {
      res.json({
        err: 'No data in databse' + "   " + err,
        status: 500
      })
    })
  }

exports.deleteMovie = (req, res) => {
  const idMovie = req.params.idmovie
  moviesModels.deleteMovies(idMovie)
  .then((result) => {
      if(result.affectedRows !== 0){
        res.json({
          message: `Success delete id ${idMovie} !`,
          // data: result
        })
      } else{
        res.json({
          message:'Id not found !',
          status: 500
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}



// TEST PAGINATION ( WORKS)
// exports.getPageMovie = (req, res) => {
//   const firstData = req.query.firstData || 0;
//   const limit = req.query.limit || 5;

//   moviesModels.getPageMovies(firstData, limit)
//     .then((result) => {
//         const dataMovie = result
//         client.setex("getAllMovies", 60 * 60 * 12, JSON.stringify(dataMovie))
//         // console.log(JSON.stringify(dataMovie));
//         res.json({
//           message: 'Success',
//           status : 200,
//           data: dataMovie,
//         })
//     })
//     .catch((err) => {
//       res.json({
//         err: err + 'Error Cant Get Data',
//         status: 400
//       })
//     })
// }