const { Task } = require('../../database').models
const { repository: repositoryClass } = require('../../database')
const repository = new repositoryClass(Task)
async function findTaskById(req, res, next) {
  const id = req.params.id
  const task = await repository.findById(id)
  res.json(task)
}
module.exports = findTaskById
