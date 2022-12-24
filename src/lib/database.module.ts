import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ISearchParams } from 'src/common/interface/search-param.interface';
import { ConfigurationModule } from 'src/config/configuration.module';
import { importAllFilesFromFolder } from 'src/utils/read-all-module.utils';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const primaryDataSource =
          configService.get<Record<string, string>>('db.primary');
        return {
          name: 'default',
          type: 'postgres',
          host: primaryDataSource.host,
          port: +primaryDataSource.port,
          username: primaryDataSource.username,
          password: primaryDataSource.password,
          database: primaryDataSource.database,
          entities: [...importAllFilesFromFolder(ISearchParams.ENTITY)],
          synchronize: Boolean(primaryDataSource.synchronize),
          logging: Boolean(primaryDataSource.logging),
          subscribers: [],
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
