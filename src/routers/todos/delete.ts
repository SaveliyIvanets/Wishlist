const { Task } = require('../../database').models
const { repository: repositoryClass } = require('../../database')
const repository = new repositoryClass(Task)
import { Request, Response, NextFunction } from 'express';
async function deleteTask(req: Request, res: Response, next: NextFunction) {
  await repository.delete(req.params.id)
  res.send('Delete complete')
}

module.exports = deleteTask
export{}