import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from "multer"
import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"


export const UploadFileS3 = (filedName: string) => {
  return class UploadUtility extends FileInterceptor(filedName, {
    storage: memoryStorage()
  }) { }
}


export const UploadFileFieldsS3 = (uploadFields: MulterField[]) => {
  return class UploadUtility extends FileFieldsInterceptor(uploadFields, {
    storage: memoryStorage()
  }) { }
}