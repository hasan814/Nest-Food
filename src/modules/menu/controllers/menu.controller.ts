import { UseInterceptors, UploadedFile, ParseIntPipe, Put } from '@nestjs/common';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FoodDto, UploadFoodDto } from '../dto/food.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageValidationPipe } from 'src/common/utils/functions';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { SupplierGuard } from 'src/common/decorators/auth.decorator';
import { UploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { MenuService } from '../services/menu.service';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';

@Controller('menu')
@ApiTags("Menu")
@SupplierGuard()
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

  @Get('/get-menu-by-id/:id')
  @SkipAuth()
  findAll(@Param("id", ParseIntPipe) id: number) {
    return this.menuService.findAll(id)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id)
  }

  @Put(':id')
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(UploadFileS3("image"))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() foodDto: UploadFoodDto,
    @UploadedFile(ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.menuService.update(id, foodDto, image)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.delete(id)
  }
}
