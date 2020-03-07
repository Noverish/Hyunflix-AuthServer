import * as AuthService from './auth';
import * as CryptoService from './crypto';
import * as TokenService from './token';

type ServiceResult = [number, object];

export {
  ServiceResult,
  AuthService,
  CryptoService,
  TokenService,
};
