import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserProfileService } from '../service/user-profile.service';
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
  UpdateUserProfilePasswordDto,
} from '../dto/user-profile.dto';
import { PublicRoute } from 'src/decorator/public-route.decorator';
import { Request } from 'express';
import { ApiTagsAndBearer } from 'src/decorator/api-tags-and-bearer.decorator';
import { ResponseMessage } from 'src/decorator/response.decorator';

@ApiTagsAndBearer('User Profile')
@Controller('/user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @ResponseMessage('register', 'register', HttpStatus.CREATED)
  @PublicRoute()
  @Post('/register')
  register(@Body() body: CreateUserProfileDto) {
    return this.userProfileService.register(body);
  }

  @ResponseMessage('user profile', 'fetch', HttpStatus.OK)
  @Get('/fetch')
  async getUserProfile(@Req() req: Request) {
    return this.userProfileService.getUserProfile({
      id: req.user['id'],
      email: req.user['email'],
    });
  }

  @ResponseMessage('user profile', 'updateUserProfile', HttpStatus.OK)
  @Put('/update')
  async updateUserProfile(
    @Body() body: UpdateUserProfileDto,
    @Req() req: Request,
  ) {
    const user = {
      id: req.user['id'],
      email: req.user['email'],
    };
    return this.userProfileService.updateUserProfile(body, user);
  }

  @ResponseMessage('user profile', 'updatePassword', HttpStatus.OK)
  @Patch('/update-password')
  async updatePassword(
    @Body() body: UpdateUserProfilePasswordDto,
    @Req() req: Request,
  ) {
    const user = {
      id: req.user['id'],
      email: req.user['email'],
    };
    return this.userProfileService.updatePassword(body, user);
  }

  @ResponseMessage('user profile', 'deactivate', HttpStatus.OK)
  @Delete('/deactivate')
  async deactivateUserProfile() {
    return 'deactivate';
  }

  @ResponseMessage('user profile', 'userProfileDeleted', HttpStatus.OK)
  @Delete('/delete')
  async deleteUserProfile() {
    return 'delete';
  }
}
