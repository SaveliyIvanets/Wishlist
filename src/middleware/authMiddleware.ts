const jwt = require('jsonwebtoken')
const SECRET = require('../config').JWT_SECRET
const { User, Role } = require('../database').models
const { repository: repositoryClass } = require('../database')
import { Request, Response, NextFunction } from 'express';
const roleRepository = new repositoryClass(Role)
const userRepository = new repositoryClass(User)

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const error = new Error() as any
  error.name = 'Unauthorized'
  error.message = 'the token is missing'
  error.status = 401
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(error)
  }
  const token = authHeader.split(' ')[1]
  jwt.verify(token, SECRET, async (err : any, payload : any) => {
    if (err) {
      error.message = 'the token is invalid'
      return next(error)
    }
    let user = null
    try {
      user = await userRepository.findById(payload.id)
    } catch (e) {
      return next(e)
    }
    try {
      const role = await roleRepository.findById(user.roleId)
      user.role = role.role
    } catch (e : any) {
      console.error('Role not found for user:', user.id, e.message)
    }
    (req as any) = user || payload
    next()
  })
}
export{}