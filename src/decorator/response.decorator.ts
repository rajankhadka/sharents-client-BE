import { SetMetadata, applyDecorators } from '@nestjs/common';

export const ResponseMessage = (
  message: string,
  source: string,
  statusCode: number,
) => {
  return applyDecorators(
    SetMetadata('message', message),
    SetMetadata('source', source),
    SetMetadata('statusCode', statusCode),
  );
};
