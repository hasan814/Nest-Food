import { OrderItemEntity } from './entities/order-items.entity';
import { OrderController } from './controllers/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { OrderEntity } from './entities/order.entity';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
