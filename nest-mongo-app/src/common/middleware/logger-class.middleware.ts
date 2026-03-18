import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware - 2');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Time:', new Date());

    next();
  }
}
