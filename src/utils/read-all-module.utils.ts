/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs';
import * as path from 'path';
import { ISearchParams } from 'src/common/interface/search-param.interface';

const readAllModuleFromDirectory = (
  searchParams: ISearchParams,
  folderPath: string = path.join(__dirname, '../core'),
  files: Array<string> = [],
) => {
  if (fs.existsSync(folderPath)) {
    if (!fs.statSync(folderPath).isDirectory()) {
      const _filesArrary = folderPath.split('.');
      if (
        _filesArrary[_filesArrary.length - 2] === searchParams &&
        _filesArrary[_filesArrary.length - 1] === 'js'
      ) {
        files.push(folderPath);
      }
      return files;
    }
    const allFoldersFiles: string[] = fs.readdirSync(folderPath);
    for (let i = 0; i < allFoldersFiles.length; i++) {
      const createPath = path.join(folderPath, allFoldersFiles[i]);
      readAllModuleFromDirectory(searchParams, createPath, files);
    }
  }
  return files;
};

export function importAllFilesFromFolder(searchParams: ISearchParams) {
  const files: string[] = readAllModuleFromDirectory(searchParams);
  const importModules = [];
  for (let i = 0; i < files.length; i++) {
    Object.keys(require(files[i])).length &&
      importModules.push(Object.values(require(files[i]))[0]);
  }
  // console.log(importModules[0]);
  return importModules;
}
