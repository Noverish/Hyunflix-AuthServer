import { Router, Request, Response, NextFunction } from 'express';

import { rsaKeyPair } from '@src/app';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200);
  res.json({ key: rsaKeyPair.publicKey });
});

export default router;
