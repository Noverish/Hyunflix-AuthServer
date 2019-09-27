import { Router, Request, Response, NextFunction } from 'express';

import { RegisterCode } from '@src/entity';
import { validateToken } from './validate-token';
import { dateToString } from '@src/utils/date';

const router: Router = Router();


router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const code = req.body['code'];
  const realname = req.body['realname'];

  (async function () {
    const token = req.headers['authorization'].toString().replace('Bearer ', '');
    const result = await validateToken(token);
    if(!result || result.userId !== 1) {
      res.status(401);
      res.end();
    }
    
    const regCode: RegisterCode | null = await RegisterCode.findByCode(code);

    if (regCode) {
      res.status(409);
      res.json({ msg: '이미 존재하는 회원가입 코드입니다' });
      return;
    }

    const codeId: number = await RegisterCode.insert(code, realname);
    const inserted: RegisterCode = await RegisterCode.findById(codeId);
    
    res.status(200);
    res.json(inserted.convert());
  })().catch(err => next(err));
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  (async function () {
    const token = req.headers['authorization'].toString().replace('Bearer ', '');
    const result = await validateToken(token);
    if(!result || result.userId !== 1) {
      res.status(401);
      res.end();
    }
    
    const regCodes: RegisterCode[] = await RegisterCode.findAll();
    
    res.status(200);
    res.json(regCodes.map(c => c.convert()));
  })().catch(err => next(err));
})

export default router;