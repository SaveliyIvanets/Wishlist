const config = require('../../config')
const { Task } = require('../../database').models
const { repository: repositoryClass } = require('../../database')
const repository = new repositoryClass(Task)
import { Request, Response, NextFunction } from 'express';
async function createTask(req: Request, res: Response, next: NextFunction) {
  const error = new Error() as any
  if (!req.body || !req.body.title) {
    error.name = 'UpdateError'
    error.message = 'the data is incorrect'
    error.status = 400
    return next(error)
  }
  const task = {
    _id: config.tests ? req.body._id : undefined,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
    userId: req.user.id,
  }
  await repository.create(task)
  res.send('Save complete!')
}

module.exports = createTask
export{}
