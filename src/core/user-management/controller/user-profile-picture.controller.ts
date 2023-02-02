import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTagsAndBearer } from 'src/decorator/api-tags-and-bearer.decorator';
import { ResponseMessage } from 'src/decorator/response.decorator';
import { Express, Request } from 'express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ImageUploadDto } from '../dto/user-profile-picture.dto';
import { imageMulterConfig } from 'src/utils/multer-image.utils';
import { UserProfilePictureService } from '../service/user-profile-picture.service';

@ApiTagsAndBearer('User Profile Picture')
@Controller('/user-profile-picture')
export class UserProfilePictureController {
  constructor(
    private readonly userProfilePictureService: UserProfilePictureService,
  ) {}

  /**
   * upload new profile picture when account is created!!!
   */
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'upload profile picture',
    type: ImageUploadDto,
  })
  @ResponseMessage('profile picture', 'uploadProfile', HttpStatus.CREATED)
  @Post('/upload-picture')
  @UseInterceptors(FileInterceptor('image', imageMulterConfig))
  uploadPicture(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.userProfilePictureService.uploadPicture(
      { id: req.user['id'], email: req.user['email'] },
      file,
    );
  }

  /**
   * upload profile picture when account is updated!!!
   */
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'update profile picture',
    type: ImageUploadDto,
  })
  @ResponseMessage('profile picture', 'updateProfilePicture', HttpStatus.OK)
  @Put('/update')
  @UseInterceptors(FileInterceptor('image', imageMulterConfig))
  async updateProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.userProfilePictureService.updateProfilePicture(
      { id: req.user['id'], email: req.user['email'] },
      file,
    );
  }

  /**
   * fetch profile picture when account is actived and not deleted
   */
  @ResponseMessage('profile picture', 'fetch', HttpStatus.OK)
  // @Header('Content-Type', 'application/json')
  // @Header('Cache-Control', 'none')
  @Get('/fetch')
  async fetchProfilePicture(@Req() req: Request) {
    return this.userProfilePictureService.fetchProfilePicture({
      id: req.user['id'],
      email: req.user['email'],
    });
  }

  /**
   * remove profile picture
   */
  @ResponseMessage('profile picture', 'remove', HttpStatus.OK)
  @Delete('/remove')
  async removeProfilePicure(@Req() req: Request) {
    return this.userProfilePictureService.removeProfilePicure({
      id: req.user['id'],
      email: req.user['email'],
    });
  }
}
