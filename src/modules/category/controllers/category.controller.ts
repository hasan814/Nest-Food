import { Controller, UploadedFile, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { Delete, Get, Post, Body, Query, Patch, Param } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageValidationPipe } from 'src/common/utils/functions';
import { CreateCategoryDto } from '../dto/category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { CategoryService } from '../services/category.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { Pagination } from 'src/common/decorators/pagination.decorator';


@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(UploadFileS3('image'))
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.categoryService.create(createCategoryDto, image)
  }

  @Get()
  @Pagination()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoryService.findAll(paginationDto)
  }

  @Get('/by-slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.categoryService.findBySlug(slug)
  }

  @Patch(':id')
  @UseInterceptors(UploadFileS3('image'))
  @ApiConsumes(SwaggerConsumes.MultipartData)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.categoryService.update(id, updateCategoryDto, image)
  }

  @Delete(":id")
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id)
  }
}
