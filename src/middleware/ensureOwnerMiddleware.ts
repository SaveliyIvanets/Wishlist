const { Task } = require('../database').models
const { repository: repositoryClass } = require('../database')
const taskRepository = new repositoryClass(Task)
module.exports = async (req, res, next) => {
  const error = new Error()
  error.name = 'Forbidden'
  error.message = 'Access denied, no required permissions'
  error.status = 403
  const id = req.params.id
  const task = await taskRepository.findById(id)
  if (req.user.role !== 'admin' && task.userId !== req.user.id) {
    return next(error)
  }
  next()
}
