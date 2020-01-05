import { Router, Request, Response, NextFunction } from 'express';

import { validateSession } from '@src/middlewares';
import { AuthService, UserService, CryptoService } from '@src/services';

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

router.use(validateSession);

router.post('/change-password', (req: Request, res: Response, next: NextFunction) => {
  AuthService.changePassword(req['session'], req.body)
    .then(([status, payload]) => {
      res.status(status);
      res.json(payload);
    }).catch(next);
});

router.post('/get-user', (req: Request, res: Response, next: NextFunction) => {
  UserService.getUser(req['session'], req.body)
    .then(([status, payload]) => {
      res.status(status);
      res.json(payload);
    }).catch(next);
});

router.use('/validate-session', (req: Request, res: Response, next: NextFunction) => {
  res.status(204);
  res.set('x-hyunsub-session', JSON.stringify(req['session']));
  res.end();
});

export default router;
