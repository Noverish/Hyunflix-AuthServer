import { assert } from 'chai';
import * as sinon from 'sinon';
import { Context } from 'mocha';

import * as crypto from 'crypto';
import { Authority, Session, User } from '@src/entity';
import { SessionService } from '@src/services';

const defaultTest = {
  paths: [''],
  userId: 0,
  authority: 0,
  sessionId: '12345678901234567890123456789012',
  findAuthorityArgs: [],
  allowedPathsString: '',
  allowedPathsArray: [],
};

type Test = typeof defaultTest;

const pathTests: Partial<Test>[] = [
  {
    paths: ['/a'],
    allowedPathsString: '/a',
    allowedPathsArray: ['/a'],
  },
  {
    paths: ['/a,/b'],
    allowedPathsString: '/a,/b',
    allowedPathsArray: ['/a', '/b'],
  },
  {
    paths: ['/a,/b', '/c'],
    allowedPathsString: '/a,/b,/c',
    allowedPathsArray: ['/a', '/b', '/c'],
  },
  {
    paths: ['/a,/b', '', '/c'],
    allowedPathsString: '/a,/b,/c',
    allowedPathsArray: ['/a', '/b', '/c'],
  },
  {
    paths: ['/a,/b', '', '/c', '/a'],
    allowedPathsString: '/a,/b,/c',
    allowedPathsArray: ['/a', '/b', '/c'],
  },
  {
    paths: ['/a,/b', '', '/c', '/a,/c'],
    allowedPathsString: '/a,/b,/c',
    allowedPathsArray: ['/a', '/b', '/c'],
  },
];

const authorityTests: Partial<Test>[] = [
  {
    authority: 1,
    findAuthorityArgs: [0],
  },
  {
    authority: 2,
    findAuthorityArgs: [1],
  },
  {
    authority: 3,
    findAuthorityArgs: [0, 1],
  },
  {
    authority: 5,
    findAuthorityArgs: [0, 2],
  },
  {
    authority: 11,
    findAuthorityArgs: [0, 1, 3],
  },
];

describe('create-session', () => {
  afterEach(sinon.restore);

  it('default', run.bind(this, defaultTest));

  pathTests.forEach((v, i) => {
    it(`Path Test ${i}`, run.bind(this, { ...defaultTest, ...v }));
  });

  authorityTests.forEach((v, i) => {
    it(`Authority Test ${i}`, run.bind(this, { ...defaultTest, ...v }));
  });
});

async function run(this: Context, test: Test) {
  const findAuthorityStub = sinon.stub(Authority, 'findByIds').resolves(Array.from({ length: test.paths.length }, (v, i) => {
    const authority = new Authority();
    authority.paths = test.paths[i];
    return authority;
  }));

  const deleteSessionStub = sinon.stub(Session, 'delete');
  const insertSessionStub = sinon.stub(Session, 'insert');
  sinon.stub(crypto, 'randomBytes').callsFake(() => Buffer.from(test.sessionId, 'hex'));

  const user = new User();
  user.id = test.userId;
  user.authority = test.authority;

  const result = await SessionService.createSession(user);

  assert.deepEqual(findAuthorityStub.firstCall.args[0], test.findAuthorityArgs);
  assert.deepEqual(deleteSessionStub.firstCall.args[0], { userId: test.userId } as any);
  assert.deepEqual(insertSessionStub.firstCall.args[0], {
    id: test.sessionId,
    allowedPaths: test.allowedPathsString,
    userId: test.userId,
    authority: test.authority,
  } as any);

  assert.deepEqual(result, {
    id: test.sessionId,
    allowedPaths: test.allowedPathsArray,
    userId: test.userId,
    authority: test.authority,
  });
}
