import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { BasketDto, DiscountBasketDto } from '../dto/create-basket.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { BasketService } from '../services/basket.service';
import { UserGuard } from 'src/common/decorators/auth.decorator';


@Controller('basket')
@ApiTags("Basket")
@UserGuard()
export class BasketController {
  constructor(private basketService: BasketService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  addToBasket(@Body() basketDto: BasketDto) {
    return this.basketService.addToBasket(basketDto)
  }

  @Delete()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  removeFormBasket(@Body() basketDto: BasketDto) {
    return this.basketService.removeFormBasket(basketDto)
  }

  @Delete('/discount')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  removeDiscount(@Body() basketDto: DiscountBasketDto) {
    return this.basketService.removeDiscount(basketDto)
  }

  @Get()
  getBasket() { }

}
