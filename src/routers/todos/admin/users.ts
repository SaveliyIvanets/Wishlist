const { User } = require('../../../database').models
const { repository: repositoryClass } = require('../../../database')
const userRepository = new repositoryClass(User)
import { Request, Response, NextFunction } from 'express';
async function showUsers(req: Request, res: Response, next: NextFunction) {
  const complete = req.query.complete
  const sorted = req.query.sorted
  const limit = req.query.limit || 20
  const offset = req.query.offset || 0
  const filtr = complete === undefined ? {} : { completed: complete }
  const users = await userRepository.findAll(
    filtr,
    limit,
    offset,
    'createdAt',
    sorted
  )
  res.json(users)
}
module.exports = showUsers
export{}