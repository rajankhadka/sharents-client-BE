import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

export function ApiTagsAndBearer(tags: string) {
  return applyDecorators(ApiTags(tags), ApiBearerAuth());
}
