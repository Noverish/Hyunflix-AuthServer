import { Router, Request, Response, NextFunction } from 'express';

import { Session } from '@src/entity';
import * as jwt from '@src/utils/jwt';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  (async function() {
    let token = ''
  
    if (req.cookies['x-hyunsub-token']) {
      token = req.cookies['x-hyunsub-token'];
    }
    
    if (req.headers['authorization']) {
      token = req.headers['authorization'].toString().replace('Bearer ', '');
    }
    
    if (!token) {
      res.status(401);
      res.end();
      return;
    }
    
    try {
      const session: Session | null = await Session.findByToken(token);
      
      if(!session) {
        res.status(401);
        res.end();
        return;
      }
      
      const decoded = jwt.verify(token);
      const userId = decoded.userId;
      
      if(userId === 1) {
        res.status(204);
        res.set({
          'x-hyunsub-userId': userId,
          'x-hyunsub-authorizations': ['/'],
        });
        res.end();
      } else {
        res.status(204);
        res.set({
          'x-hyunsub-userId': userId,
          'x-hyunsub-authorizations': [
            '/Movies',
            '/torrents',
            '/TV_Programs',
            '/Musics',
          ],
        });
        res.end();
      }
    } catch (msg) {
      res.status(401);
      res.end();
    }
  })().catch(err => next(err));
});

export default router;