import { ImageValidationPipe } from 'src/common/utils/functions';
import { CreateCategoryDto } from '../dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { CategoryService } from '../services/category.service';
import { ApiConsumes } from '@nestjs/swagger';

import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes(SwaggerConsumes.MultipartData)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.categoryService.create(createCategoryDto, image)
  }

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }
}
