import * as Joi from '@hapi/joi';
import * as bcrypt from 'bcryptjs';

import { User, RefreshToken } from '@src/entity';
import { ServiceResult, TokenService, CryptoService } from '@src/services';
import { AccessTokenPayload } from '@src/models';

interface Schema {
  username: string;
  password: string;
}

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

async function login(args: object): Promise<ServiceResult> {
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

  const accessTokenPayload: AccessTokenPayload = await TokenService.getAccessTokenPayload(user);
  const accessToken = await TokenService.issueAccessToken(accessTokenPayload);
  const refreshToken = await TokenService.issueRefreshToken({ userId: user.id });

  await RefreshToken.update(user.id, { token: refreshToken });

  return [200, { accessToken, refreshToken }];
}

export default login;
