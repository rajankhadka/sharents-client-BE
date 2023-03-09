import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilePictureController } from './controller/user-profile-picture.controller';
import { UserProfileController } from './controller/user-profile.controller';
import { UserProfileRepository } from './repository/user-profile.repository';
import { UserProfileService } from './service/user-profile.service';
import { UserProfilePictureService } from './service/user-profile-picture.service';
import { UserProfilePictureRepository } from './repository/user-profile-picture.repository';
import { OTPModule } from '../feature/otp/otp.module';
import { ClientPasswordModule } from '../feature/client-password/client-password.module';
import { RabbitmqService } from 'src/lib/rabbitmq.service';
import { DigitalSignatureModule } from '../feature/digital-signature/digital-signature.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserProfileRepository,
      UserProfilePictureRepository,
    ]),
    OTPModule,
    ClientPasswordModule,
    DigitalSignatureModule,
  ],
  controllers: [UserProfileController, UserProfilePictureController],
  providers: [UserProfileService, UserProfilePictureService, RabbitmqService],
  exports: [UserProfileService],
})
export class UserManagementModule {}
