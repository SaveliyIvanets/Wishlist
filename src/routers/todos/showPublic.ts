const { Task } = require('../../database').models
const { repository: repositoryClass } = require('../../database')
const repository = new repositoryClass(Task)
import { Request, Response, NextFunction } from 'express';
async function findAllPublicTasks(req: Request, res: Response, next: NextFunction) {
  const sorted = false
  const limit = 20
  const offset = 0
  const filtr = {isPublic:true}
  const tasks = await repository.findAll(
    filtr,
    limit,
    offset,
    'createdAt',
    sorted
  )
  res.json(tasks)
}

module.exports = findAllPublicTasks
export{}
