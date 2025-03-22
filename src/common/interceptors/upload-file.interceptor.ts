import { FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from "multer"


export const UploadFileS3 = (fileName: string) => {
  return class UploadUtility extends FileInterceptor(fileName, {
    storage: memoryStorage()
  }) { }
}