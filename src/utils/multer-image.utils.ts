/* eslint-disable prettier/prettier */
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { supportedImageType } from 'src/common/file-upload';
import {randomUUID} from 'crypto';
import { FileMulterException } from 'src/exception/file-multer.exception';

/**
 * file upload for profile picture
 * aka images
 */
export const imageMulterConfig: MulterOptions = {
  storage: diskStorage({
    destination(req, file, cb) {
      const imagePath = path.join(process.cwd(), 'upload/profile');
      if(!fs.existsSync(imagePath)){
        fs.mkdirSync(imagePath, {recursive: true});
        return cb(null,imagePath);
      }
      return cb(null, imagePath);
    },
    filename(req, file, cb) {
        const _extName = file.mimetype.split('/');
        const extName = _extName[_extName.length-1];
        const fileName = `${Date.now()}-${randomUUID()}-${file.fieldname}.${extName}`;
        return cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if(file.fieldname !== 'image') return cb(new FileMulterException('Invalid fieldname'), false);
    if(!supportedImageType.includes(file.mimetype)) return cb(new FileMulterException('Unsupported file type'), false);
    return cb(null, true);
  },
};


/**
 * file filter for fieldName === image
 */
