import { SupplierController } from './controllers/supplier.controller';
import { SupplierOTPEntity } from './entities/supplier-otp.entity';
import { SupplierService } from './services/supplier.service';
import { SupplierEntity } from './entities/supplier.entity';
import { CategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierEntity, SupplierOTPEntity]),
    CategoryModule,
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule { }
