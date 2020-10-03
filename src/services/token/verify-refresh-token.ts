import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

import { RefreshTokenPayload } from '@src/models';
import { REFRESH_PUBLIC_KEY_PATH, TOKEN_ALGORITHM } from '@src/config';

const publicKey = fs.readFileSync(REFRESH_PUBLIC_KEY_PATH);

function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, { algorithms: [TOKEN_ALGORITHM] }, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload as RefreshTokenPayload);
      }
    });
  });
}

export default verifyRefreshToken;
