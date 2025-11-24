const { Task } = require('../../database').models
const { repository: repositoryClass } = require('../../database')
const repository = new repositoryClass(Task)

async function findAllTasks(req, res, next) {
  const complete = req.query.complete
  const sorted = req.query.sorted
  const limit = req.query.limit || 20
  const offset = req.query.offset || 0
  const filtr = complete === undefined ? {} : { completed: complete }
  const tasks = await repository.findAll(
    filtr,
    limit,
    offset,
    'createdAt',
    sorted
  )
  res.json(tasks)
}

module.exports = findAllTasks
export{}
