import * as Joi from '@hapi/joi';
import * as bcrypt from 'bcryptjs';

import { User } from '@src/entity';
import { ServiceResult, CryptoService } from '@src/services';
import { SessionDTO } from '@src/models';

interface Schema {
  oldPassword: string;
  newPassword: string;
}

const schema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export default async function (session: SessionDTO, args: object): Promise<ServiceResult> {
  const { value, error } = schema.validate(args);
  if (error) {
    return [400, { msg: error.message }];
  }

  const { oldPassword: oldPasswordCipher, newPassword: newPasswordCipher } = value as Schema;

  const oldPassword = CryptoService.decrypt(oldPasswordCipher, CryptoService.privateKey);
  const newPassword = CryptoService.decrypt(newPasswordCipher, CryptoService.privateKey);

  const user: User | null = await User.findOne({ id: session.userId });

  if (!user) {
    return [400, { msg: '해당 유저가 존재하지 않습니다' }];
  }

  if (!(await bcrypt.compare(oldPassword, user.password))) {
    return [400, { msg: '비밀번호가 틀렸습니다' }];
  }

  const hash: string = await bcrypt.hash(newPassword, 10);
  await User.update(session.id, { password: hash });

  return [204, {}];
}
