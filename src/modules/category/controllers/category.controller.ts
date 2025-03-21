import { CreateCategoryDto } from '../dto/category.dto';
import { CategoryService } from '../services/category.service';
import { SwaggerConsumes } from 'src/common/enums/swagger.enum';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { ApiConsumes } from '@nestjs/swagger';

import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(UploadFileS3('image'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,

    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return { image, createCategoryDto };
  }
}
