import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';

import { User } from '@src/entity';
import { IUser } from '@src/models';
import * as rsa from '@src/utils/rsa';
import { rsaKeyPair } from '@src/app';
import { validateToken } from './validate-token';

const router: Router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const oldPasswordCipher: string = req.body['oldPassword'];
  const newPasswordCipher: string = req.body['newPassword'];

  (async function () {
    const oldPassword = rsa.decrypt(oldPasswordCipher, rsaKeyPair.privateKey);
    const newPassword = rsa.decrypt(newPasswordCipher, rsaKeyPair.privateKey);

    const iUser: IUser | null = await validateToken(req);

    if (!iUser) {
      res.status(401);
      res.end({ msg: 'Unauthorized' });
      return;
    }

    const user: User = await User.findOne(iUser.id);
    
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      res.status(400);
      res.json({ msg: '비밀번호가 틀렸습니다' });
      return;
    }

    const hash: string = await bcrypt.hash(newPassword, 10);
    await User.update(iUser.id, { password: hash });
    
    res.status(204);
    res.end();
  })().catch(err => next(err));
});

export default router;
