import { BasketController } from './controllers/basket.controller';
import { DiscountService } from '../discount/services/discount.service';
import { DiscountEntity } from '../discount/entities/discount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from './services/basket.service';
import { BasketEntity } from './entities/basket.entity';
import { AuthModule } from '../auth/auth.module';
import { MenuModule } from '../menu/menu.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, MenuModule, TypeOrmModule.forFeature([BasketEntity, DiscountEntity])],
  controllers: [BasketController],
  providers: [BasketService, DiscountService],
})
export class BasketModule { }
