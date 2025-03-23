import { DiscountController } from './controllers/discount.controller';
import { DiscountService } from './services/discount.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule { }
