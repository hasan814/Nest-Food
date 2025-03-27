import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { MenuTypeDto, UploadMenuTypeDto } from '../dto/menu-type.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { MenuTypeService } from '../services/type.service';
import { SupplierGuard } from 'src/common/decorators/auth.decorator';


@Controller('menu_type')
@ApiTags("Menu-Type")
@SupplierGuard()
export class MenuTypeController {
  constructor(private readonly menuTypeService: MenuTypeService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() typeDto: MenuTypeDto) {
    return this.menuTypeService.create(typeDto)
  }

  @Get()
  findAll() {
    return this.menuTypeService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuTypeService.findOnById(id)
  }

  @Put(':id')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() typeDto: UploadMenuTypeDto,
  ) {
    return this.menuTypeService.update(id, typeDto)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.menuTypeService.remove(id)
  }
}
