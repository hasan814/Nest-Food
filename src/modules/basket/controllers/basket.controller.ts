import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consume';
import { BasketService } from '../services/basket.service';
import { BasketDto } from '../dto/create-basket.dto';
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
  removeFormBasket() { }
  @Get()
  getBasket() { }

}
