import { randomBytes } from 'crypto';

import { User, Session, Authority } from '@src/entity';
import { SessionDTO } from '@src/models';
import { SESSION_ID_LENGTH } from '@src/config';
import { getEnabledIndexOfBinary } from '@src/utils';

function generateSessionId(): string {
  return randomBytes(SESSION_ID_LENGTH / 2).toString('hex');
}

export default async function (user: User): Promise<SessionDTO> {
  const authorityNum = user.authority;
  const indexes = getEnabledIndexOfBinary(authorityNum);
  const authorities = await Authority.findByIds(indexes);
  const paths = authorities
    .map(v => v.paths.split(','))
    .reduce((acc, curr) => new Set([...acc, ...curr]), new Set<string>());
  const allowedPaths = Array.from(paths)
    .filter(v => !!v);

  const id = generateSessionId();

  await Session.delete({ userId: user.id });

  await Session.insert({
    id,
    allowedPaths: allowedPaths.join(','),
    userId: user.id,
    authority: user.authority,
  });

  return {
    id,
    allowedPaths,
    userId: user.id,
    authority: user.authority,
  };
}
