import { User } from '@src/entity';
import { ServiceResult, TokenService } from '@src/services';
import { RefreshTokenPayload, AccessTokenPayload } from '@src/models';

async function reissueAccessToken(payload: RefreshTokenPayload, accessToken: string | undefined): Promise<ServiceResult> {
  if (!accessToken) {
    return [401, { msg: 'No Access Token' }];
  }

  const user: User | null = await User.findOne({ id: payload.userId });
  if (!user) {
    return [400, { msg: '해당 유저가 존재하지 않습니다' }];
  }

  const accessTokenPayload: AccessTokenPayload = await TokenService.getAccessTokenPayload(user);
  const newAccessToken = await TokenService.issueAccessToken(accessTokenPayload);

  return [200, { accessToken: newAccessToken }];
}

export default reissueAccessToken;
