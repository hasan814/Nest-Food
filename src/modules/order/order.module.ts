import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
