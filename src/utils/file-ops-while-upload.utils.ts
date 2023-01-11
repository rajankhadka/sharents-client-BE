import * as fs from 'fs';
import * as fsPromise from 'fs/promises';
/**
 * remove file aka file or image while its single file
 */
export function removeFile(path: string) {
  if (!fs.existsSync(path)) return;
  fs.rmSync(path, { recursive: true });
}

export async function readFile(path: string) {
  if (!fs.existsSync(path)) return null;
  return await fsPromise.readFile(path, { encoding: 'base64' });
}
