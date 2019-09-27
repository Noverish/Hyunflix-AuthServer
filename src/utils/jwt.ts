import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../credentials';

export function create(obj: object) {
  const payload = {
    ...obj,
    date: new Date().toISOString(),
  };

  return jwt.sign(payload, jwtSecret);
}

export function verify(token: string) {
  return jwt.verify(token, jwtSecret);
}
