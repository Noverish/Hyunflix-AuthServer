import { Request } from 'express';

import { Session } from '@src/entity';
import { SessionDTO } from '@src/models';
import { SESSION_ID_COOKIE_KEY } from '@src/config';

export default async function (req: Request): Promise<SessionDTO | null> {
  let sessionId = '';

  if (req.cookies[SESSION_ID_COOKIE_KEY]) {
    sessionId = req.cookies[SESSION_ID_COOKIE_KEY];
  }

  if (req.get(SESSION_ID_COOKIE_KEY)) {
    sessionId = req.get(SESSION_ID_COOKIE_KEY).toString();
  }

  if (req.query['sessionId']) {
    sessionId = req.query['sessionId'];
  }

  if (!sessionId) {
    return null;
  }

  const session: Session | null = await Session.findOne({ id: sessionId });

  if (!session) {
    return null;
  }

  return session.convert();
}
