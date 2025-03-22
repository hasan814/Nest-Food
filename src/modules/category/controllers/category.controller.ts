import { MaxFileSizeValidator, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('category')
export class CategoryController {
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpeg|png|jpg|webp)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return { createCategoryDto, image };
  }
}
