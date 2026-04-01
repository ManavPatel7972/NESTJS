import { NextFunction, Request, Response } from 'express';

export const RoleMiddlware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = req['user'];

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: 'Not allowed to access this route' });
    }
    next();
  };
};
