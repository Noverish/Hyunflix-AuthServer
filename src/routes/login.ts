import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';

import { User, Session } from '@src/entity';
import * as rsa from '@src/utils/rsa';
import * as jwt from '@src/utils/jwt';
import { rsaKeyPair } from '@src/app';

const router: Router = Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const userAgent: string = (req.headers['user-agent']) ? req.headers['user-agent'].toString() : '';
  const usernameCipher: string = req.body['username'];
  const passwordCipher: string = req.body['password'];

  (async function () {
    const username = rsa.decrypt(usernameCipher, rsaKeyPair.privateKey);
    const password = rsa.decrypt(passwordCipher, rsaKeyPair.privateKey);
  
    const user: User | null = await User.findByUsername(username);

    if (!user) {
      res.status(400);
      res.json({ msg: '존재하지 않는 아이디입니다' });
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400);
      res.json({ msg: '비밀번호가 틀렸습니다' });
      return;
    }

    const token = jwt.create({ userId: user.userId });
    
    await Session.deleteByUser(user);
    await Session.insert(user, token, userAgent);

    res.json(user.convert(token));
  })().catch(err => next(err));
});

export default router;