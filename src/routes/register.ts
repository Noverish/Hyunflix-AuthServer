import { Router, Request, Response, NextFunction } from 'express';
import { InsertResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User, RegisterCode, Session } from '@src/entity';
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
    const regCode: RegisterCode | null = await RegisterCode.findByCode(regCodeStr);

    if (!regCode) {
      res.status(400);
      res.json({ msg: '존재하지 않는 회원가입 코드입니다' });
      return;
    }

    if (regCode.user) {
      res.status(400);
      res.json({ msg: '이미 사용된 회원가입 코드입니다' });
      return;
    }

    if (await User.findOne({ username })) {
      res.status(400);
      res.json({ msg: '이미 존재하는 아이디입니다' });
      return;
    }

    const hash: string = await bcrypt.hash(password, 10);
    const result: InsertResult = await User.insert({ username, password: hash });
    const userId: number = result.identifiers[0].id;
    
    const user: User = await User.findOne(userId);
    await RegisterCode.updateUser(regCode.id, user);

    const token: string = jwt.create({ userId: user.id });
    await Session.deleteByUser(user);
    await Session.insert(user, token, userAgent);

    res.json(user.convert(token));
  })().catch(err => next(err));
});

export default router;
