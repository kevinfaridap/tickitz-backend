const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (!err) {
          resolve(hash)
        } else {
          reject(err)
        }
      })
    })
  })
}

module.exports = {
  hashPassword
}

// bcrypt.genSalt(10, function(err, salt){
//   bcrypt.hash(password, salt, async function(err, hash){
//     const data = {
//       email: email,
//       password: hash,
//       firstName: firstName,
//       lastName: lastName,
//       phoneNumber: ''
//     }
//     const resultInsert = await userModels.insertUser(data)
//     // return helpers.response(res, resultInsert, 401, null)
//     return res.json({
//       status : 200,
//       message: 'Success Register',
//       data: `Your email: ${email}`
//     })
//   })
// })
