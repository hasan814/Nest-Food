import { ImageValidationPipe } from 'src/common/utils/functions';
import { CreateCategoryDto } from '../dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
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
  @ApiConsumes(SwaggerConsumes.MultipartData)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return { createCategoryDto, image };
  }
}
