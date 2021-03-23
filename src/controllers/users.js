const userModels = require('../models/users')
const helpers = require('../helpers/helper')
const hashPassword = require('../helpers/hashPassword')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {v4 : uuidv4} = require('uuid')


exports.getUser = (req, res) => {
  userModels.getUsers()
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getUserById = (req, res) => {
  const idUser = req.params.idUser
  userModels.getUserById(idUser)
    .then((result) => {
      res.json({
        data: result
      })
    })
}

exports.insertUser = (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    idUser: uuidv4(),
    firstName,
    lastName,
    email,
    phoneNumber,
  }
  userModels.insertUser(data)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}


// hash passowrd
exports.registerUser = async(req, res) => {
  try {
      const { firstName, lastName, email, password, phoneNumber } = req.body
      const result = await userModels.findUser(email)
      // const count = result[0].countEmail
      // if (count > 0){
      //   return helpers.response(res, null, 401, {email : 'Email already exists'})
      // }
      if (result.length !== 0){
        return helpers.response(res, null, 401, {email : 'Email already exists'})
      }
          const data = {
            idUser: uuidv4(),
            email: email,
            password: await hashPassword.hashPassword(password),
            firstName: firstName,
            lastName: lastName,
            phoneNumber: ''
          }
      const resultInsert = await userModels.insertUser(data)
      
      return helpers.response(res, resultInsert, 401, null)
    } catch (error) {
      return helpers.response(res, null, 500, {message: 'Internal Server Error'})
    }
  
}


exports.loginUser = async (req, res) => {
  try {
    const {email, password  } = req.body
    const result = await userModels.findUser(email)
    if(result.length === 0){
      return helpers.response(res, null, 401, {message: 'Email or Password is incorrect'})
    }
    const user = result[0]
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
      return helpers.response(res, null, 401, {message: 'Email or Password is incorrect'})
    }
    delete user.password;

    // Cek email
    const payload = {email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role}
    jwt.sign(payload, process.env.SECRET_KEY , {expiresIn: '1h'}, function(err, token){
     user.token = token
     return helpers.response(res, user, 200,null)    
    });
  } catch (error) {
    return helpers.response(res, null, 500, {message: 'Internal Server Error'})
  }
}

exports.updateUser = (req, res) => {
  const idUser = req.params.idUser
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    firstName,
    lastName,
    email,
    phoneNumber
  }
  userModels.updateUser(idUser, data)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.deleteUser = (req, res) => {
  const idUser = req.params.idUser
  userModels.deleteUser(idUser)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
