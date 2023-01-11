import { Injectable } from '@nestjs/common';
import { IUserInfo } from '../interface/user-profile.interface';
import { UserProfilePictureRepository } from '../repository/user-profile-picture.repository';
import { RunTimeException } from 'src/exception/run-time.exception';
import { removeFile, readFile } from 'src/utils/file-ops-while-upload.utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class UserProfilePictureService {
  constructor(
    private readonly userProfilePictureRepository: UserProfilePictureRepository,
  ) {}

  async uploadPicture(userInfo: IUserInfo, file: Express.Multer.File) {
    try {
      if (await this.fetchActiveProfilePicture(userInfo.id))
        throw new RunTimeException(
          'Profile picture already exists, Continue with update profile picure',
        );
      await this.userProfilePictureRepository.save({
        fileName: file.filename,
        filePath: file.destination,
        fileSize: file.size,
        fileType: file.mimetype,
        userProfileId: userInfo.id,
      });
      return {};
    } catch (error) {
      removeFile(file.path);
      throw error;
    }
  }

  @Transactional()
  async updateProfilePicture(userInfo: IUserInfo, file: Express.Multer.File) {
    try {
      if (await this.fetchActiveProfilePicture(userInfo.id))
        await this.userProfilePictureRepository.update(
          { userProfileId: userInfo.id, isActive: true, isDeleted: false },
          { isActive: false },
        );

      await this.userProfilePictureRepository.save({
        fileName: file.filename,
        filePath: file.destination,
        fileSize: file.size,
        fileType: file.mimetype,
        userProfileId: userInfo.id,
      });
      return {};
    } catch (error) {
      removeFile(file.path);
      throw error;
    }
  }

  async fetchProfilePicture(userInfo: IUserInfo) {
    const fetchData =
      await this.userProfilePictureRepository.fetchProfilePicture(userInfo.id);
    if (!Object.keys(fetchData).length) return {};
    const file = await readFile(fetchData.filePath);
    if (!file) return {};
    return {
      file: file,
      fileName: fetchData.fileName,
    };
  }

  async removeProfilePicure(userInfo: IUserInfo) {
    if (!(await this.fetchActiveProfilePicture(userInfo.id))) return {};
    await this.userProfilePictureRepository.update(
      {
        userProfileId: userInfo.id,
        isActive: true,
        isDeleted: false,
      },
      { isActive: false },
    );
    return {};
  }

  async fetchActiveProfilePicture(userId: string) {
    const fetchProfilePicture = await this.userProfilePictureRepository.findOne(
      {
        where: {
          userProfileId: userId,
          isActive: true,
          isDeleted: false,
        },
      },
    );
    if (fetchProfilePicture) return true;
    return false;
  }
}
