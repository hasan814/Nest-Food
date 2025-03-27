import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { DiscountEntity } from '../discount/entities/discount.entity';
import { MenuTypeEntity } from '../menu/entities/type.entity';
import { DiscountModule } from '../discount/discount.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity } from '../basket/entities/basket.entity';
import { BasketModule } from '../basket/basket.module';
import { OrderEntity } from '../order/entities/order.entity';
import { MenuModule } from '../menu/menu.module';
import { AuthModule } from '../auth/auth.module';
import { MenuEntity } from '../menu/entities/menu.entity';
import { S3Service } from '../s3/s3.service';
import { S3Module } from '../s3/s3.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MenuEntity,
      OrderEntity,
      BasketEntity,
      MenuTypeEntity,
      DiscountEntity,
    ]),
    S3Module,
    MenuModule,
    AuthModule,
    BasketModule,
    DiscountModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService, S3Service],
})

export class PaymentModule { }
