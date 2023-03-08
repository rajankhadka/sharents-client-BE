import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { constants, pbkdf2Sync, privateEncrypt, publicEncrypt } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { RunTimeException } from 'src/exception/run-time.exception';
import * as sshpk from 'sshpk';
@Injectable()
export class DigitalSignatureService {
  private digitalSigantureHashedConfig: Record<string, any>;
  constructor(private readonly configService: ConfigService) {
    this.digitalSigantureHashedConfig = this.configService.get<
      Record<string, any>
    >('digitalSignature.hashing');
  }

  private async generateHashed(data: string): Promise<Buffer> {
    return Buffer.from(
      pbkdf2Sync(
        data,
        this.digitalSigantureHashedConfig.secret,
        this.digitalSigantureHashedConfig.iteration,
        this.digitalSigantureHashedConfig.keyLen,
        this.digitalSigantureHashedConfig.digest,
      ),
    );
  }

  /**
   * encrypte hashed data i.e digital signature
   * using sh-be-client aka this application, private key to encrypt data
   */
  private async encrypteHashedData(data: Buffer): Promise<string> {
    const privateKeyShClient = path.join(
      process.cwd(),
      'key-pair',
      'digital-signature-key',
      'client-be-private.pem',
    );
    if (!fs.existsSync(privateKeyShClient))
      throw new RunTimeException('file not found');
    const privateKeyShClientBuffer = Buffer.from(
      fs.readFileSync(privateKeyShClient, { encoding: 'utf-8' }),
    );
    const cypherData = privateEncrypt(
      {
        key: privateKeyShClientBuffer,
        padding: constants.RSA_PKCS1_PADDING,
      },
      data,
    );
    return cypherData.toString('base64');
  }

  /**
   * generation of digital signatue by combining of original data + encrypted hashed function
   * to ensure authenticity and integrity
   */
  private generateDigitalSignature(
    message: string,
    encrypteHashedSign: string,
  ) {
    return Buffer.from(message + '.' + encrypteHashedSign);
  }

  /**
   * generation of encrypted digital signature
   * to ensure confidencatiality
   */
  private async encryptMessage(data: Buffer): Promise<string> {
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
    const cypherData = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      data,
    );

    return cypherData.toString('base64');
  }

  public async digitalSignature(data: string) {
    //change to buffer
    const bufferData = Buffer.from(data);
    //hashed sign of original data
    const hashedSign = await this.generateHashed(data);

    //encrypted hashed sign
    const encryptedHashedSign = await this.encrypteHashedData(hashedSign);

    //genrate encrypted digital signature
    const encryptedMessage = await this.encryptMessage(bufferData);

    //generate digital signature
    const send = this.generateDigitalSignature(
      encryptedMessage,
      encryptedHashedSign,
    );
    return send;
  }
}
