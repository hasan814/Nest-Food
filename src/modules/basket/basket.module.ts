import { BasketController } from './controllers/basket.controller';
import { BasketService } from './services/basket.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule { }
