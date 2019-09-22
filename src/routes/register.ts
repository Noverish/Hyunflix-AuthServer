import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';

import { User, RegCode, Session } from '@src/entity';
import * as rsa from '@src/utils/rsa';
import * as jwt from '@src/utils/jwt';
import { rsaKeyPair } from '@src/app';

const router: Router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const userAgent: string = (req.headers['user-agent']) ? req.headers['user-agent'].toString() : '';
  const regCodeCipher: string = req.body['reg_code'];
  const usernameCipher: string = req.body['username'];
  const passwordCipher: string = req.body['password'];
  
  const username = rsa.decrypt(usernameCipher, rsaKeyPair.privateKey);
  const password = rsa.decrypt(passwordCipher, rsaKeyPair.privateKey);
  const regCodeStr = rsa.decrypt(regCodeCipher, rsaKeyPair.privateKey);

  (async function () {
    const regCode: RegCode | null = await RegCode.findByCode(regCodeStr);

    if (!regCode) {
      res.status(400);
      res.json({ msg: '존재하지 않는 회원가입 코드입니다' });
      return;
    }

    if (regCode.userId) {
      res.status(400);
      res.json({ msg: '이미 사용된 회원가입 코드입니다' });
      return;
    }

    if (await User.findByUsername(username)) {
      res.status(400);
      res.json({ msg: '이미 존재하는 아이디입니다' });
      return;
    }

    const hash: string = await bcrypt.hash(password, 10);
    const user: User = await User.insert(username, hash);
    await RegCode.updateUserId(regCode.codeId, user.userId);

    const token: string = jwt.create({ userId: user.userId });
    await Session.insert(user.userId, token, userAgent);

    res.json({ token, userId: user.userId, authority: user.authority.split(',') });
  })().catch(err => next(err));
});

export default router;