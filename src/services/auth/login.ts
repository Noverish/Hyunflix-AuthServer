import * as Joi from '@hapi/joi';
import * as bcrypt from 'bcryptjs';

import { User } from '@src/entity';
import { ServiceResult, SessionService, CryptoService } from '@src/services';

interface Schema {
  username: string;
  password: string;
}

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default async function (args: object): Promise<ServiceResult> {
  const { value, error } = schema.validate(args);
  if (error) {
    return [400, { msg: error.message }];
  }

  const { username: usernameCipher, password: passwordCipher } = value as Schema;

  const username = CryptoService.decrypt(usernameCipher, CryptoService.privateKey);
  const password = CryptoService.decrypt(passwordCipher, CryptoService.privateKey);

  const user: User | null = await User.findOne({ username });

  if (!user) {
    return [400, { msg: '존재하지 않는 아이디입니다' }];
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return [400, { msg: '비밀번호가 틀렸습니다' }];
  }

  const session = await SessionService.createSession(user);

  return [200, { sessionId: session.id, username: user.username }];
}
