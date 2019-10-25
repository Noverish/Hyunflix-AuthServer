import { Router } from 'express';

import login from './login';
import register from './register';
import rsaKey from './rsa-key';
import validateToken from './validate-token';
import registerCode from './register-code';
import changePassword from './change-password';

const router: Router = Router();

router.use('/rsa-key', rsaKey);
router.use('/login', login);
router.use('/register', register);
router.use('/validate-token', validateToken);
router.use('/register-codes', registerCode);
router.use('/change-password', changePassword);

export default router;
