import { Request, Response, NextFunction } from 'express';

import { SessionService } from '@src/services';

export default function (req: Request, res: Response, next: NextFunction) {
  SessionService.validateSession(req)
    .then((sessionDTO) => {
      if (sessionDTO) {
        req['session'] = sessionDTO;
        next();
      } else {
        res.status(401);
        res.end();
      }
    })
    .catch(next);
}
