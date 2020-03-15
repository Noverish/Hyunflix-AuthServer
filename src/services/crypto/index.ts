import * as NodeRSA from 'node-rsa';

const key = new NodeRSA({ b: 2048 });
export const publicKey = key.exportKey('pkcs8-public');
export const privateKey = key.exportKey('pkcs8-private');

export function decrypt(cipher: string, privateKeyString: string): string {
  const privateKey2 = new NodeRSA(privateKeyString, 'pkcs8-private');
  return privateKey2.decrypt(cipher, 'utf8');
}

export function encrypt(plaintext: string, publicKeyString: string): string {
  const publicKey2 = new NodeRSA(publicKeyString, 'pkcs8-public');
  return publicKey2.encrypt(plaintext, 'base64');
}
