const connection = require('../configs/db')

const user = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getUserById: (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE idUser= ?', idUser, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  insertUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  // Ganti dengan finduser
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(email) as countEmail FROM user WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  findUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * from user WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  updateUser: (idUser, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE user SET ? WHERE idUser=?', [data, idUser], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  deleteUser: (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM user WHERE idUser=?', idUser, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

}

module.exports = user
