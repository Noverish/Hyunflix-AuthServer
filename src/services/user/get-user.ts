import { Request } from 'express';

import { User } from '@src/entity';
import { ServiceResult, SessionService } from '@src/services';
import { SessionDTO } from '@src/models';

export default async function (session: SessionDTO, req: Request): Promise<ServiceResult> {
  const user: User | null = await User.findOne({ id: session.userId });

  if (!user) {
    return [400, { msg: 'Error 1925' }];
  }

  return [204, user.convert()];
}
