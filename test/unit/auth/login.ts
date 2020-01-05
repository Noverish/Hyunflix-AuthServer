import { assert } from 'chai';
import * as sinon from 'sinon';
import { Context } from 'mocha';

import * as bcrypt from 'bcryptjs';
import { User } from '@src/entity';
import { AuthService, SessionService, CryptoService } from '@src/services';

const defaultTest = {
  username: 'username',
  password: 'password',
  dbPassword: '',
  sessionId: '1234567890abcdef',
  status: 200,
};

type Test = typeof defaultTest;

before(async () => {
  defaultTest.dbPassword = await bcrypt.hash(defaultTest.password, 10);
});

describe('login', () => {
  afterEach(sinon.restore);

  it('default', run.bind(this, defaultTest));
});

async function run(this: Context, test: Test) {
  const stub = sinon.stub(User, 'findOne').callsFake(async () => {
    const user = new User();
    user.password = test.dbPassword;
    user.username = test.username;
    return user;
  });
  sinon.stub(SessionService, 'createSession').resolves({ id: test.sessionId } as any);

  const usernameCipher = CryptoService.encrypt(test.username, CryptoService.publicKey);
  const passwordCipher = CryptoService.encrypt(test.password, CryptoService.publicKey);

  const result = await AuthService.login({ username: usernameCipher, password: passwordCipher });

  assert.deepEqual(stub.firstCall.args[0], { username: test.username } as any);
  assert.deepEqual(result, [defaultTest.status, { sessionId: test.sessionId, username: test.username }]);
}
