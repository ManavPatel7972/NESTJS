import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Middleware - 1');

  console.log('From logger functional  Middleware', new Date());

  next();
}
