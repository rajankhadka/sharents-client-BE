import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileController } from './controller/user-profile.controller';
import { UserProfileRepository } from './repository/user-profile.repository';
import { UserProfileService } from './service/user-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileRepository])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [],
})
export class UserManagementModule {}
