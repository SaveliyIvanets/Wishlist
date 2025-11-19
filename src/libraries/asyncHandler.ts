import { Request, Response, NextFunction } from 'express';

module.exports = (callback: (req: Request, res: Response, next: NextFunction) => any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
};