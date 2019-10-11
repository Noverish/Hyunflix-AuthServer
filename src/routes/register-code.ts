import { Router, Request, Response, NextFunction } from 'express';

import { RegisterCode } from '@src/entity';
import { checkAdmin } from '@src/middlewares/check-admin';

const router: Router = Router();

router.post('/', checkAdmin, (req: Request, res: Response, next: NextFunction) => {
  const code = req.body['code'];
  const realname = req.body['realname'];

  (async function () {
    const regCode: RegisterCode | null = await RegisterCode.findByCode(code);

    if (regCode) {
      res.status(409);
      res.json({ msg: '이미 존재하는 회원가입 코드입니다' });
      return;
    }

    const id: number = await RegisterCode.insert(code, realname);
    const inserted: RegisterCode = await RegisterCode.findById(id);

    res.status(200);
    res.json(inserted.convert());
  })().catch(err => next(err));
});

router.get('/', checkAdmin, (req: Request, res: Response, next: NextFunction) => {
  (async function () {
    const regCodes: RegisterCode[] = await RegisterCode.findAll();

    res.status(200);
    res.json(regCodes.map(c => c.convert()));
  })().catch(err => next(err));
});

export default router;
