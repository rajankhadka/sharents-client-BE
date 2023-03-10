import * as fs from 'fs';
import * as path from 'path';

export enum E_LOGS {
  INFO = 'info',
  ERROR = 'error',
}

export function checkFile(date: Date, type: E_LOGS) {
  const fileName = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}.log`;
  const directioryPath = path.join(process.cwd(), 'logs', type);

  if (!fs.existsSync(path.join(directioryPath, fileName))) {
    fs.closeSync(fs.openSync(path.join(directioryPath, fileName), 'w'));
  }

  return fileName;
}
