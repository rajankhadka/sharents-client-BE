import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { RunTimeException } from 'src/exception/run-time.exception';

export function messageEncryption(data: Buffer) {
  const publicKeyFilePath = path.join(
    process.cwd(),
    'key-pair',
    'client-public.pem',
  );
  if (!fs.existsSync(publicKeyFilePath))
    throw new RunTimeException('file not found');
  const publicKey: Buffer = Buffer.from(
    fs.readFileSync(publicKeyFilePath, { encoding: 'utf-8' }),
  );
  const cypherData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    data,
  );

  return cypherData;
}
