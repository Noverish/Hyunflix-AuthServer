import * as SessionService from './session';
import * as AuthService from './auth';
import * as CryptoService from './crypto';
import * as UserService from './user';

type ServiceResult = [number, object];

export {
  ServiceResult,
  SessionService,
  AuthService,
  CryptoService,
  UserService,
};
