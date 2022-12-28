import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserProfileService } from '../service/user-profile.service';
import { CreateUserProfileDto } from '../dto/user-profile.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('/user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Post('/register')
  register(@Body() body: CreateUserProfileDto) {
    return this.userProfileService.register(body);
  }

  @Get('/fetch')
  @UseGuards(JwtAuthGuard)
  async getUserProfile() {
    return 'fetch';
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
