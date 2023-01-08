import { ConfigService } from '@nestjs/config';
import { pbkdf2Sync } from 'crypto';
import configuration from '../config/configutaion';
import { RunTimeException } from 'src/exception/run-time.exception';

export function hashedPassword(password: string) {
  const configurationService = new ConfigService(configuration());
  const passwordConfig =
    configurationService.get<Record<string, any>>('client.password');

  if (!Object.keys(passwordConfig).length)
    throw new RunTimeException('cannot load env file');

  return pbkdf2Sync(
    password,
    passwordConfig.secret,
    passwordConfig.iteration,
    passwordConfig.keyLen,
    passwordConfig.digest,
  ).toString('hex');
}

export function validateHashedPassword(
  plainPassword: string,
  hashedPassword: string,
) {
  const configurationService = new ConfigService(configuration());
  const passwordConfig =
    configurationService.get<Record<string, any>>('client.password');

  if (!Object.keys(passwordConfig).length)
    throw new RunTimeException('cannot load env file');

  const password = pbkdf2Sync(
    plainPassword,
    passwordConfig.secret,
    passwordConfig.iteration,
    passwordConfig.keyLen,
    passwordConfig.digest,
  ).toString('hex');

  if (password === hashedPassword) return true;
  return false;
}
