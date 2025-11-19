module.exports = async (req, res, next) => {
  const error = new Error()
  error.name = 'Forbidden'
  error.message = 'Access denied, no required permissions'
  error.status = 403
  if (req.user.role !== 'admin') {
    return next(error)
  }
  next()
}
