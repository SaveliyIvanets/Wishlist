const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../../../database').models
const { repository: repositoryClass } = require('../../../database')
const repository = new repositoryClass(User)
const SECRET = require('../../../config').JWT_SECRET

async function login(req, res, next) {
  const username = req.body.username
  const password = req.body.password
  const error = new Error()
  error.name = 'authError'
  error.message = 'Not authorized'
  error.status = 401
  if (!username || !password) {
    error.message = 'the data is incorrect'
    error.status = 400
    return next(error)
  }
  let user = null
  try {
    user = await repository.findOne({ username: username })
  } catch {
    error.message = 'Invalid username or password'
  }
  if (user !== null && (await bcrypt.compare(password, user.passwordHash))) {
    return res.status(200).json({
      id: user.id,
      username: user.username,
      token: jwt.sign({ id: user.id, username: user.username }, SECRET, {
        expiresIn: '1h',
      }),
    })
  } else {
    error.message = 'Invalid username or password'
  }
  return next(error)
}
module.exports = login
