import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserProfileService } from '../service/user-profile.service';
import { CreateUserProfileDto } from '../dto/user-profile.dto';
import { PublicRoute } from 'src/decorator/public-route.decorator';
import { Request } from 'express';

@Controller('/user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @PublicRoute()
  @Post('/register')
  register(@Body() body: CreateUserProfileDto) {
    return this.userProfileService.register(body);
  }

  @Get('/fetch')
  async getUserProfile(@Req() req: Request) {
    return req.user;
  }

  @Put('/update')
  async updateUserProfile() {
    return 'update';
  }

  @Patch('/update-password')
  async updatePassword() {
    return 'update password';
  }

  @Delete('/deactivate')
  async deactivateUserProfile() {
    return 'deactivate';
  }

  @Delete('/delete')
  async deleteUserProfile() {
    return 'delete';
  }
}
