import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile } from '@nestjs/common';

export const FileUpload = (fieldName: string, maxSizeMB: number, fileTypes: RegExp) => {
  return UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: maxSizeMB * 1024 * 1024 }),
        new FileTypeValidator({ fileType: fileTypes }),
      ],
    }),
  );
}
