import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  res.set('Access-Control-Allow-Headers', 'Authorization');
  res.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.set('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.set('Access-Control-Expose-Headers', 'x-hyunsub-auth');

  if (req.method === 'OPTIONS') {
    res.status(204);
    res.end();
  } else {
    next();
  }
}
