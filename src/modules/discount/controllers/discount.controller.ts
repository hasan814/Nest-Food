import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateDiscountDto } from '../dto/create-discount.dto';
import { DiscountService } from '../services/discount.service';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';


@Controller('discount')
@ApiTags("Discount")
export class DiscountController {
  constructor(private readonly discountService: DiscountService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.discountService.remove(id);
  }
}
