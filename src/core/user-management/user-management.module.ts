import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilePictureController } from './controller/user-profile-picture.controller';
import { UserProfileController } from './controller/user-profile.controller';
import { UserProfileRepository } from './repository/user-profile.repository';
import { UserProfileService } from './service/user-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileRepository])],
  controllers: [UserProfileController, UserProfilePictureController],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserManagementModule {}
