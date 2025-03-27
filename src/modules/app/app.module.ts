import { CategoryModule } from '../category/category.module';
import { SupplierModule } from '../supplier/supplier.module';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from '../payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { BasketModule } from '../basket/basket.module';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { MenuModule } from '../menu/menu.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(TypeOrmConfig()),
    AuthModule,
    UserModule,
    MenuModule,
    OrderModule,
    BasketModule,
    PaymentModule,
    CategoryModule,
    SupplierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
