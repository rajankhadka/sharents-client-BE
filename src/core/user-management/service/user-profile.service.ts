import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repository/user-profile.repository';
import {
  hashedPassword,
  validateHashedPassword,
} from 'src/utils/password-hashing.utils';
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
  UpdateUserProfilePasswordDto,
} from '../dto/user-profile.dto';
import { ITokenPayload } from 'src/core/auth/interface/auth.interface';
import { IAccessTokenData } from 'src/common/interface/token-data.interface';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}
  async register(data: CreateUserProfileDto) {
    delete data.rePassword;
    data.password = hashedPassword(data.password);
    await this.userProfileRepository.save(data);
    return {};
  }

  async getUserProfile(data: IAccessTokenData) {
    return this.userProfileRepository.getUserProfile(data);
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
    await this.userProfileRepository.update(
      { id: foundUser.id, isActive: true, isDeleted: false },
      { password: data.password },
    );
    return {};
  }

  async deactivateUserProfile() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteUserProfile() {}

  async validateClient(identifier: string, password: string) {
    const fetchClient = await this.userProfileRepository.findOne({
      where: { userName: identifier, isActive: true, isDeleted: false },
      select: ['password', 'id', 'email'],
    });
    if (!fetchClient) return null;
    const verifyPassword = validateHashedPassword(
      password,
      fetchClient.password,
    );
    if (!verifyPassword) return null;
    delete fetchClient.password;
    return fetchClient;
  }

  async validateAccessToken(id: string, email: string) {
    return await this.userProfileRepository.findOne({
      where: { id, email, isActive: true, isDeleted: false },
      select: ['email', 'id'],
    });
  }

  async validateRefreshTokenUser(id: string) {
    return await this.userProfileRepository.findOne({
      where: { id, isActive: true, isDeleted: false },
      select: ['id'],
    });
  }

  async getUserProfileById(id: string){
    return await this.userProfileRepository.findOne({
      where: { id, isActive: true, isDeleted: false },
      select: ['id', 'email'],
    });
  }
}
