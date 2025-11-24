import { Request, Response, NextFunction } from 'express';
module.exports = async (req: Request, res: Response, next: NextFunction) => {
  const error = new Error()
  error.name = 'Forbidden'
  error.message = 'Access denied, no required permissions'
  error.status = 403
  if (req.user.role !== 'admin') {
    return next(error)
  }
  next()
}
