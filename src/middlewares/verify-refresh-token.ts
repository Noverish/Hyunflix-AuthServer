import { Request, Response, NextFunction } from 'express';

import { RefreshToken } from '@src/entity';
import { TokenService } from '@src/services';
import { REFRESH_TOKEN_HEADER, REFRESH_TOKEN_PAYLOAD_FILED } from '@src/config';
import { RefreshTokenPayload } from '@src/models';

export default function (req: Request, res: Response, next: NextFunction) {
  const refreshToken = req.get(REFRESH_TOKEN_HEADER);

  TokenService.verifyRefreshToken(refreshToken)
    .then((payload: RefreshTokenPayload) => {
      RefreshToken.findOne({ userId: payload.userId, token: refreshToken })
        .then((token) => {
          if (token) {
            req[REFRESH_TOKEN_PAYLOAD_FILED] = payload;
            next();
          } else {
            res.status(401);
            res.end({ msg: '로그인이 만료되었습니다' });
          }
        });
    })
    .catch((err) => {
      res.status(401);
      res.end({ msg: err.message });
    });
}
