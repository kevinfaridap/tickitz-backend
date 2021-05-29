const userModels = require('../models/users')
const helpers = require('../helpers/helper')
const hashPassword = require('../helpers/hashPassword')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const mail = require('../helpers/sendEmail')

exports.getUser = (req, res) => {
  userModels.getUsers()
    .then((result) => {
      res.json({
        message: 'Welcome Admin!!',
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}


exports.getUserByEmail = (req, res) => {
  const email = req.params.email
  userModels.getUsersByEmail(email)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data ${email}`,
          status: 200,
          data: result
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
}

exports.getUserById = (req, res) => {
  const idUser = req.params.idUser
  userModels.getUserById(idUser)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data id: ${idUser}`,
          status: 200,
          data: result
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
}

exports.insertUser = (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    idUser: uuidv4(),
    firstName,
    lastName,
    email,
    phoneNumber
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
exports.registerUser = async (req, res) => {
  try {
    const { email, password} = req.body
    const result = await userModels.findUser(email)
    // const count = result[0].countEmail
    // if (count > 0){
    //   return helpers.response(res, null, 401, {email : 'Email already exists'})
    // }
    if (result.length !== 0) {
      return helpers.response(res, null, 200, { message: 'Email already exists' })
    }
    const data = {
      idUser: uuidv4(),
      email: email,
      password: await hashPassword.hashPassword(password),
      firstName: 'yourname',
      lastName: 'lastName',
      phoneNumber: 'yourphone',
      active: false,
      role: 1,
      image: `${process.env.API_BACKEND}/image/1621882015317-default-image.png`
    }
    const resultInsert = await userModels.insertUser(data)
    
    await mail.send(data.email, "verify");
    return helpers.response(res, {data, message: 'Registered, check your email!'}, 401, null)
    // return helpers.response(res, resultInsert, 401, null)
  } catch (error) {
    return helpers.response(res, null, 500, { message: 'Internal Server Error' })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await userModels.findUser(email)
    if (result.length === 0) {
      return helpers.response(res, null, 200, { message: 'Email and Password are not registered' })
    }
    const user = result[0]

    // Jika mau pake verify email
    const isVerify = user.active
    if(isVerify == false){
      return helpers.response(res, null, 200, { message: 'Verify Your Email To Signin' })
    } 
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return helpers.response(res, null, 200, { message: 'Email or Password is incorrect' })
    }
    delete user.password

    // Cek email
    const payload = { idUser:user.idUser, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role }
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
      user.token = token
      return helpers.response(res, user, 200, null)
    })
  } catch (error) {
    return helpers.response(res, null, 500, { message: 'Internal Server Error' })
  }
}



exports.verifyUser = async (req, res) => {
  // console.log(email);
  try {
    const {email} = req.body

    const result = await userModels.findUser(email)
    if (result.length === 0) {
      return helpers.response(res, null, 200, { message: 'Email is not registered' })
    }
    const user = result[0];
    // console.log(user);
    if (user.active === 1) {
      return helpers.response(res, null, 500, { message: 'Email is activated' })
    } else {
      await userModels.verifyUsers(user.email)
      .then((result) => {
        if (result.changedRows !== 0) {
          res.json({
            message: 'Succes Verify Email',
            status: 200,
          })
        } else {
          res.json({
            message: 'Email not found !',
            status: 500
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  } catch (err) {
    console.log(err);
    helper.printError(res, 500, err.message);
  }
}




exports.updateUser = (req, res) => {
  const idUser = req.params.idUser
  const { firstName, lastName, phoneNumber } = req.body

  const data = {
    firstName,
    lastName,
    phoneNumber
  }
  userModels.updateUser(idUser, data)
    .then((result) => {
      if (result.changedRows !== 0) {
        res.json({
          message: 'Succes update data',
          status: 200,
          data: data
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



exports.updateImg = (req, res) => {
  if (!req.file) {
    const err = new Error('You must upload the image!')
    err.errorStatus = 200
    throw err
  }

  const { idUser, image } = req.body

  const data = {
    image: `${process.env.API_BACKEND}/image/${req.file.filename}`,	
  }
  userModels.updateImgs(data, idUser)
    .then((result) => {
      if (result.changedRows !== 0) {
        res.json({
          message: 'Succes update Image',
          status: 200,
          data: data
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

exports.deleteUser = (req, res) => {
  const idUser = req.params.idUser
  userModels.deleteUser(idUser)
    .then((result) => {
      if (result.affectedRows !== 0) {
        res.json({
          message: `Succes delete id: ${idUser}`,
          status: 200
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
