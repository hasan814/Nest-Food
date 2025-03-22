import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

export const ImageValidationPipe = (options?: {
  maxSize?: number;
  fileTypes?: RegExp;
}): ParseFilePipe => {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: options?.maxSize || 10 * 1024 * 1024 }),
      new FileTypeValidator({ fileType: options?.fileTypes || /(jpeg|png|jpg|webp)$/ }),
    ],
  });
}


export const isBoolean = (value: any) => {
  return ["false", false, "true", true].includes(value)
}
export const toBoolean = (value: any) => {
  return [true, 'true'].includes(value)
    ? true
    : [false, "false"].includes(value)
      ? false
      : value
}