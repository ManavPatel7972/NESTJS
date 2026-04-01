import * as jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  return jwt.sign(payload as object, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};
