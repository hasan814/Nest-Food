import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category.dto';
import { CategoryService } from '../services/category.service';
import { SwaggerConsumes } from 'src/common/enums/swagger.enum';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { ApiConsumes } from '@nestjs/swagger';
import { FileUpload } from 'src/common/decorators/upload-file.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(UploadFileS3('image'))
  create(
    @FileUpload('image', 1, /(jpg|jpeg|png|webp)$/) image: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return { image, createCategoryDto };
  }
}
