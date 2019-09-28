import { Request, Response, NextFunction } from 'express';

import { validateToken } from '@src/routes/validate-token';
import { IUser } from '@src/models';

export function checkAdmin(req: Request, res: Response, next: NextFunction) {
  (async function () {
    const user: IUser | null = await validateToken(req);

    if (!user) {
      res.status(401);
      res.json({ msg: 'Authorization Required' });
      return;
    }

    if (user.authority.includes('admin')) {
      next();
    } else {
      res.status(403);
      res.json({ msg: 'No Authority' });
    }
  })().catch(next);
}
