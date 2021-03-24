const redis = require('redis')
const client = redis.createClient(6379)
const helper = require('../helpers/helper')

const cacheAllMovies = (req, res, next) => {
  client.get('getAllNowShowingMovies', (err, data) => {
    // console.log("ISIIIIII", data);
    if (data !== null) {
      const result = JSON.parse(data)
      return helper.response(res, result, 200, null)
    } else {
      next()
    }
  })
}
const clearAllMovies = (req, res, next) => {
  client.del('getAllNowShowingMovies')
  next()
}

module.exports = {
  cacheAllMovies,
  clearAllMovies
}
