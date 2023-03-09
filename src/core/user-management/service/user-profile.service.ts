import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserProfileRepository } from '../repository/user-profile.repository';
import {
  hashedPassword,
  validateHashedPassword,
} from 'src/utils/password-hashing.utils';
import {
  CreateUserProfileDto,
  DeactivateUserProfileDto,
  ForgetPasswordDto,
  ForgetPasswordOtpDto,
  UpdateUserProfileDto,
  UpdateUserProfilePasswordDto,
} from '../dto/user-profile.dto';
import { IAccessTokenData } from 'src/common/interface/token-data.interface';
import { readFile } from 'src/utils/file-ops-while-upload.utils';
import { OtpService } from 'src/core/feature/otp/otp.service';
import { EOTPTYPE } from 'src/core/feature/otp/otp.dto';
import { ClientPasswordService } from 'src/core/feature/client-password/client-password.service';
import { RunTimeException } from 'src/exception/run-time.exception';
import { EPASSWORDREMARK } from 'src/core/feature/client-password/client-password.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { RabbitmqService } from 'src/lib/rabbitmq.service';
import { RABBITMQROUTE } from 'src/common/interface/rabbimq.interface';
import { E_MAIL_TYPE } from 'src/common/message';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly rabbitMqService: RabbitmqService,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly otpService: OtpService,
    private readonly clientPasswordService: ClientPasswordService,
  ) {}
  async register(data: CreateUserProfileDto) {
    delete data.rePassword;
    data.password = hashedPassword(data.password);
    await this.userProfileRepository.save(data);
    this.rabbitMqService.publishMessage(
      'client-exchange',
      RABBITMQROUTE.MAILROUTE,
      JSON.stringify({
        route: RABBITMQROUTE.MAILROUTE,
        payload: {
          username: data.userName,
          email: data.email,
          type: E_MAIL_TYPE.ACCOUNT_CREATED,
        },
      }),
    );
    return {};
  }

  async getUserProfile(data: IAccessTokenData) {
    const fetchUser = await this.userProfileRepository.getUserProfile(data);
    // let responseData = {};
    if (!fetchUser) return {};
    if (!Object.keys(fetchUser.profilePicture).length) return fetchUser;
    const file = await readFile(fetchUser.profilePicture.filePath);
    if (!file) {
      fetchUser.profilePicture = {};
    } else {
      delete fetchUser.profilePicture.filePath;
      fetchUser.profilePicture['file'] = file;
    }

    return fetchUser;
  }

  async foundUserProfile(data: IAccessTokenData) {
    return await this.userProfileRepository.findOne({
      where: {
        id: data.id,
        email: data.email,
        isActive: true,
        isDeleted: false,
      },
      select: ['id', 'password'],
    });
  }

  async updateUserProfile(data: UpdateUserProfileDto, user: IAccessTokenData) {
    const foundUser = await this.foundUserProfile(user);
    if (!foundUser) return {};
    await this.userProfileRepository.update(
      { id: user.id, isActive: true, isDeleted: false },
      { ...data },
    );
    return {};
  }

  @Transactional()
  async updatePassword(
    data: UpdateUserProfilePasswordDto,
    user: IAccessTokenData,
  ) {
    const foundUser = await this.foundUserProfile(user);
    if (!foundUser) return {};
    delete data.rePassword;
    if (!validateHashedPassword(data.oldPassword, foundUser.password))
      return {};
    data.password = hashedPassword(data.password);
    delete data.oldPassword;
    await this.clientPasswordService.validatePassword(
      data.password,
      foundUser.id,
      EPASSWORDREMARK.CHANGE_PASSWORD,
    );
    await this.userProfileRepository.update(
      { id: foundUser.id, isActive: true, isDeleted: false },
      { password: data.password },
    );
    await this.userProfileRepository.deleteIdentificationAfterPasswordChanged(
      user.id,
      user.email,
    );
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deactivateUserProfile(data: DeactivateUserProfileDto, userId: string) {
    const isVerifiedUser = await this.userProfileRepository.findOne({
      where: { id: userId, isActive: true, isDeleted: false },
      select: ['id', 'email', 'password'],
    });
    if (!isVerifiedUser) throw new UnauthorizedException();
    if (!validateHashedPassword(data.password, isVerifiedUser.password))
      throw new UnauthorizedException();
    const getVerifiedOtp = await this.otpService.getVerifiedOtp(
      userId,
      EOTPTYPE.DEACTIVATEUSERPROFILE,
    );
    //deactivate user profile
    await this.userProfileRepository.update(
      { id: userId, isActive: true, isDeleted: false },
      { isActive: false },
    );
    await this.otpService.deleteOtp(getVerifiedOtp.otpId);
    return {};
  }

  async fetchUserProfileByUserId(userId: string) {
    return await this.userProfileRepository.findOne({
      id: userId,
      isActive: true,
      isDeleted: false,
    });
  }

  async otpFordeactivateUserProfile(password: string, userId: string) {
    const fetchUserId = await this.fetchUserProfileByUserId(userId);
    if (!fetchUserId) throw new UnauthorizedException();
    return this.otpService.newOtpGeneration(
      userId,
      EOTPTYPE.DEACTIVATEUSERPROFILE,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteUserProfile() {}

  @Transactional()
  async validateClient(identifier: string, password: string) {
    const fetchClient =
      await this.userProfileRepository.validateUserCredentials(identifier);
    if (!fetchClient) return null;
    const verifyPassword = validateHashedPassword(
      password,
      fetchClient.password,
    );
    if (!verifyPassword) return null;
    if (!fetchClient.isActive)
      await this.userProfileRepository.update(
        { id: fetchClient.id, email: fetchClient.email },
        { isActive: true },
      );
    delete fetchClient.password;
    return fetchClient;
  }

  async validateAccessToken(id: string, email: string, identification: string) {
    return await this.userProfileRepository.validateAccessToken(
      id,
      email,
      identification,
    );
  }

  async validateRefreshTokenUser(id: string) {
    return await this.userProfileRepository.findOne({
      where: { id, isActive: true, isDeleted: false },
      select: ['id'],
    });
  }

  async getUserProfileById(id: string) {
    return await this.userProfileRepository.findOne({
      where: { id, isActive: true, isDeleted: false },
      select: ['id', 'email'],
    });
  }

  async otpForForgetPassword(data: ForgetPasswordOtpDto) {
    const fetchUser =
      await this.userProfileRepository.getUserIdByEmailOrUsernameOrPhone(
        data.identifier,
      );
    if (!fetchUser) throw new UnauthorizedException();

    return await this.otpService.newOtpGeneration(
      fetchUser.id,
      EOTPTYPE.FORGET_PASSWORD,
    );
  }

  @Transactional()
  async forgetPassword(data: ForgetPasswordDto) {
    const fetchUser =
      await this.userProfileRepository.getUserIdByEmailOrUsernameOrPhone(
        data.identifier,
      );
    if (!fetchUser)
      throw new RunTimeException('client identifier doesnot match');

    const getVerifiedOtp = await this.otpService.getVerifiedOtp(
      fetchUser.id,
      EOTPTYPE.FORGET_PASSWORD,
    );

    /**
     * validate password with recently changed 3 password and saved the new password
     */
    data['password'] = hashedPassword(data.password);
    await this.clientPasswordService.validatePassword(
      data.password,
      fetchUser.id,
      EPASSWORDREMARK.FORGET_PASSWORD,
    );

    //password update
    await this.userProfileRepository.update(
      { id: fetchUser.id, isActive: true, isDeleted: false },
      { password: data.password },
    );

    //changed otp status as deleted
    await this.otpService.deleteOtp(getVerifiedOtp.otpId);
    //in validate identification token
    await this.userProfileRepository.deleteIdentificationAfterPasswordReset(
      data.identifier,
    );
    this.rabbitMqService.publishMessage(
      'client-exchange',
      RABBITMQROUTE.MAILROUTE,
      JSON.stringify({
        route: RABBITMQROUTE.MAILROUTE,
        payload: {
          username: fetchUser['userName'],
          email: fetchUser['email'],
          type: E_MAIL_TYPE.FORGET_PASSWORD,
        },
      }),
    );
    return {};
  }

  async fetchEmailAndUserNameUsingIdentifier(identifier: string) {
    return await this.userProfileRepository.fetchEmailAndUserNameUsingIdentifier(
      identifier,
    );
  }
}
