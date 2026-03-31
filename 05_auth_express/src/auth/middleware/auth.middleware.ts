import { ConsoleLogger, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('AuthMiddleware called');

    const auth = req.headers.authorization;
    // console.log('Authorization header:', auth);
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = auth.split(' ')[1];

    try {
      const decode = verifyToken(token);

      if (!decode) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req['user'] = decode;
      next();
    } catch (error) {
      console.log('Error in AuthMiddleware:', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
