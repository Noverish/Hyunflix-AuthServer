import { Router, Request, Response, NextFunction } from 'express';

import { Session, User } from '@src/entity';
import * as jwt from '@src/utils/jwt';

const router: Router = Router();

export async function validateToken(token: string) {
  const session: Session | null = await Session.findByToken(token);
      
  if(!session) {
    return null;
  }
  
  try {
    const decoded = jwt.verify(token);
    const userId: number = decoded.userId;
    
    const user: User | null = await User.findByUserId(userId);
  
    if (!user) {
      return null;
    }
  
    if(userId === 1) {
      return {
        userId,
        authorizations: ['/'],
        authority: user.authority.split(','),
      }
    } else {
      return {
        userId,
        authorizations: [
          '/Movies',
          '/torrents',
          '/TV_Programs',
          '/Musics',
        ],
        authority: user.authority.split(','),
      }
    }
  } catch (err) {
    return null;
  }
}

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  (async function() {
    let token = '';
  
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
    
    const result = await validateToken(token);
    
    if (result) {
      res.status(204);
      res.set({
        'x-hyunsub-userId': result.userId,
        'x-hyunsub-authorizations': result.authorizations,
        'x-hyunsub-authority': result.authority,
      });
      res.end();
    } else {
      res.status(401);
      res.end();
    }
  })().catch(err => next(err));
});

export default router;