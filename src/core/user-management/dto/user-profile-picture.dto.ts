import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: BinaryType;
}
