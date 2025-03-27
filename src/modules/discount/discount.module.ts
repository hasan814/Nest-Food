import { DiscountService } from './services/discount.service';
import { DiscountEntity } from './entities/discount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity])],
  providers: [DiscountService],
  exports: [DiscountService],
})

export class DiscountModule { }
