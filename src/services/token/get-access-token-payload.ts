import { Authority, User } from '@src/entity';
import { getEnabledIndexOfBinary } from '@src/utils';
import { AccessTokenPayload } from '@src/models';

export default async function (user: User): Promise<AccessTokenPayload> {
  const indexes: number[] = getEnabledIndexOfBinary(user.authority);
  const authorities: Authority[] = await Authority.findByIds(indexes);
  const paths: Set<string> = authorities
    .map(v => v.paths.split(','))
    .reduce((acc, curr) => new Set([...acc, ...curr]), new Set<string>());
  const allowedPaths: string[] = Array.from(paths)
    .filter(v => !!v);

  return {
    allowedPaths,
    userId: user.id,
    authority: user.authority,
  };
}
