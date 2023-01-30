import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientPasswordService } from './client-password.service';
import { ClientPasswordRepository } from './client-password.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientPasswordRepository])],
  providers: [ClientPasswordService],
  exports: [ClientPasswordService],
})
export class ClientPasswordModule {}
