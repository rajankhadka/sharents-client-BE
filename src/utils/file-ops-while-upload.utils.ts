import * as fs from 'fs';
/**
 * remove file aka file or image while its single file
 */
export function removeFile(path: string) {
  if (!fs.existsSync(path)) return;
  fs.rmSync(path, { recursive: true });
}

export function readFile(path: string) {
  if (!fs.existsSync(path)) return null;
  return fs.readFileSync(path, { encoding: 'base64' });
}

