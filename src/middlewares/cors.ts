import { Request, Response, NextFunction } from 'express';

import { REFRESH_TOKEN_HEADER } from '@src/config';

export default function (req: Request, res: Response, next: NextFunction) {
  res.set('Access-Control-Allow-Headers', `${REFRESH_TOKEN_HEADER}, Content-Type`);
  res.set('Access-Control-Allow-Methods', 'GET,POST');
  res.set('Access-Control-Allow-Origin', req.get('Origin') || '*');

  if (req.method === 'OPTIONS') {
    res.status(204);
    res.end();
  } else {
    next();
  }
}
