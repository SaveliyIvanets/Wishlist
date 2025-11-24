const { User } = require('../../../database').models
const { repository: repositoryClass } = require('../../../database')
const userRepository = new repositoryClass(User)
async function deleteUser(req, res, next) {
  const id = req.params.id
  await userRepository.delete(id)
  res.send('Delete complete')
}
module.exports = deleteUser
export{}
