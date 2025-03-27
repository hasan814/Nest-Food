import { PaymentController } from './controllers/payment.controller';
import { ZarinpalService } from '../http/http.service';
import { PaymentService } from './services/payment.service';
import { DiscountEntity } from '../discount/entities/discount.entity';
import { MenuTypeEntity } from '../menu/entities/type.entity';
import { DiscountModule } from '../discount/discount.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../user/entities/address.entity';
import { PaymentEntity } from './entities/payment.entity';
import { BasketEntity } from '../basket/entities/basket.entity';
import { BasketModule } from '../basket/basket.module';
import { OrderService } from '../order/services/order.service';
import { OrderEntity } from '../order/entities/order.entity';
import { MenuModule } from '../menu/menu.module';
import { AuthModule } from '../auth/auth.module';
import { MenuEntity } from '../menu/entities/menu.entity';
import { HttpModule } from '@nestjs/axios';
import { S3Service } from '../s3/s3.service';
import { S3Module } from '../s3/s3.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MenuEntity,
      OrderEntity,
      BasketEntity,
      AddressEntity,
      PaymentEntity,
      MenuTypeEntity,
      DiscountEntity,
    ]),
    S3Module,
    MenuModule,
    HttpModule,
    AuthModule,
    BasketModule,
    DiscountModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, S3Service, ZarinpalService, OrderService],
})

export class PaymentModule { }
