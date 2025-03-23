import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, Put } from '@nestjs/common';
import { FoodDto, UploadFoodDto } from '../dto/food.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageValidationPipe } from 'src/common/utils/functions';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { MenuService } from '../services/menu.service';

@Controller('menu')
@ApiTags("Menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(UploadFileS3('image'))
  create(
    @Body() foodDto: FoodDto,
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.menuService.create(foodDto, image)
  }

  @Get()
  findAll() {
    return this.menuService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne()
  }

  @Put(':id')
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(UploadFileS3("image"))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() foodDto: UploadFoodDto,
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.menuService.update()
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.delete()
  }
}
