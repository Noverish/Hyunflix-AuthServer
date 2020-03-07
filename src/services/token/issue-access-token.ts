import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

import { AccessTokenPayload } from '@src/models';
import { ACCESS_TOKEN_EXPIRE, TOKEN_ALGORITHM, ACCESS_PRIVATE_KEY_PATH } from '@src/config';

const privateKey = fs.readFileSync(ACCESS_PRIVATE_KEY_PATH);

export default function (payload: AccessTokenPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { algorithm: TOKEN_ALGORITHM, expiresIn: ACCESS_TOKEN_EXPIRE }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
