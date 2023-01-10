import {
  Controller,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTagsAndBearer } from 'src/decorator/api-tags-and-bearer.decorator';
import { ResponseMessage } from 'src/decorator/response.decorator';
import { Express, Request } from 'express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from '../dto/user-profile-picture.dto';

@ApiTagsAndBearer('User Profile Picture')
@Controller('/user-profile-picture')
export class UserProfilePictureController {
  constructor() {}

  @ApiBody({ type: 'binary', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'upload profile picture',
    type: FileUploadDto,
  })
  @ResponseMessage('profile picture', 'uploadProfile', HttpStatus.CREATED)
  @Post('/upload-picture')
  @UseInterceptors(FileInterceptor('profile'))
  uploadPicture(
    @UploadedFile() profile: Express.Multer.File,
    @Req() req: Request,
  ) {
    console.log(req.user);
    console.log(profile);
    return 'profile';
  }
}
