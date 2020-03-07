import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

import { RefreshTokenPayload } from '@src/models';
import { REFRESH_TOKEN_EXPIRE, TOKEN_ALGORITHM, REFRESH_PRIVATE_KEY_PATH } from '@src/config';

const privateKey = fs.readFileSync(REFRESH_PRIVATE_KEY_PATH);

export default function (payload: RefreshTokenPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { algorithm: TOKEN_ALGORITHM, expiresIn: REFRESH_TOKEN_EXPIRE }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
