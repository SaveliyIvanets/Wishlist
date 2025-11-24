const { Task } = require('../database').models
const { repository: repositoryClass } = require('../database')
const taskRepository = new repositoryClass(Task)
import { Request, Response, NextFunction } from 'express';
module.exports = async (req: Request, res: Response, next: NextFunction) => {
  const error = new Error()as any
  error.name = 'Forbidden'
  error.message = 'Access denied, no required permissions'
  error.status = 403
  const id = req.params.id
  const task = await taskRepository.findById(id)
  if (((req as any).user.role !== 'admin' || (req as any).user.role !== 'moderator') && task.userId !== (req as any).user.id) {
    return next(error)
  }
  next()
}
//