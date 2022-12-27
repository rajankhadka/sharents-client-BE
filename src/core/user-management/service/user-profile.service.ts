import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repository/user-profile.repository';
import {
  hashedPassword,
  validateHashedPassword,
} from 'src/utils/password-hashing.utils';
import { CreateUserProfileDto } from '../dto/user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}
  async register(data: CreateUserProfileDto) {
    delete data.rePassword;
    data.password = hashedPassword(data.password);
    await this.userProfileRepository.save(data);
    return {};
  }

  async getUserProfile() {}

  async updateUserProfile() {}

  async updatePassword() {}

  async deactivateUserProfile() {}

  async deleteUserProfile() {}

  async validateClient(userName: string, password: string) {
    const fetchClient = await this.userProfileRepository.findOne({
      where: { userName, isActive: true, isDeleted: false },
    });
    if (!fetchClient) throw new Error('no user');
    const verifyPassword = validateHashedPassword(
      password,
      fetchClient.password,
    );
    if (!verifyPassword) throw new Error('password doesnot match');
    return true;
  }
}
