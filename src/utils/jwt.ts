import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@src/config';

export function create(obj: object) {
  const payload = {
    ...obj,
    date: new Date().toISOString(),
  };

  return jwt.sign(payload, JWT_SECRET);
}

export function verify(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
