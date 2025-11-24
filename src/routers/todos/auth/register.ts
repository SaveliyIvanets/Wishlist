const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User, Role} = require('../../../database').models
const { repository: repositoryClass } = require('../../../database')
const repository = new repositoryClass(User)
const roleRepository = new repositoryClass(Role)
const SECRET = require('../../../config').JWT_SECRET
import { Request, Response, NextFunction } from 'express';

async function register(req: Request, res: Response, next: NextFunction) {
  const error = new Error() as any
  const username = req.body.username
  const password = req.body.password
  const roleId =  await roleRepository.findOne({role:'user'});
  if (!username || !password) {
    error.name = 'registrationError'
    error.message =
      'the data is incorrect : the password and username must be specified'
    error.status = 400
    return next(error)
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await repository.create({
    username: username,
    passwordHash,
    roleId:  roleId.id
  })
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: '1h',
  })
  res.status(201).json({ token })
}

module.exports = register
