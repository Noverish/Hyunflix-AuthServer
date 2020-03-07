import { Router, Request, Response, NextFunction } from 'express';

import { verifyRefreshToken } from '@src/middlewares';
import { AuthService, CryptoService } from '@src/services';
import { REFRESH_TOKEN_PAYLOAD_FILED, ACCESS_TOKEN_HEADER } from '@src/config';
import { RefreshTokenPayload } from '@src/models';

const router: Router = Router();

router.get('/rsa-key', (req: Request, res: Response, next: NextFunction) => {
  res.status(200);
  res.json({ key: CryptoService.publicKey });
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  AuthService.login(req.body)
    .then(([status, payload]) => {
      res.status(status);
      res.json(payload);
    }).catch(next);
});

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  AuthService.register(req.body)
    .then(([status, payload]) => {
      res.status(status);
      res.json(payload);
    }).catch(next);
});

router.get('/verify-refresh-token', verifyRefreshToken, (req: Request, res: Response, next: NextFunction) => {
  res.status(204);
  res.end();
});

router.post('/change-password', verifyRefreshToken, (req: Request, res: Response, next: NextFunction) => {
  AuthService.changePassword(req[REFRESH_TOKEN_PAYLOAD_FILED] as RefreshTokenPayload, req.body)
    .then(([status, payload]) => {
      res.status(status);
      res.json(payload);
    }).catch(next);
});

router.post('/reissue-access-token', verifyRefreshToken, (req: Request, res: Response, next: NextFunction) => {
  AuthService.reissueAccessToken(req[REFRESH_TOKEN_PAYLOAD_FILED] as RefreshTokenPayload, req.body[ACCESS_TOKEN_HEADER])
    .then(([status, payload]) => {
      res.status(status);
      res.json(payload);
    }).catch(next);
});

export default router;
