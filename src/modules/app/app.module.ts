import { CategoryModule } from '../category/category.module';
import { SupplierModule } from '../supplier/supplier.module';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(TypeOrmConfig()),
    AuthModule,
    UserModule,
    CategoryModule,
    SupplierModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
