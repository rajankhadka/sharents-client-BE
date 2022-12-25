import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from '../repository/user-profile.repository';

@Injectable()
export class UserProfileService {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}
  async register() {}

  async getUserProfile() {}

  async updateUserProfile() {}

  async updatePassword() {}

  async deactivateUserProfile() {}

  async deleteUserProfile() {}
}
