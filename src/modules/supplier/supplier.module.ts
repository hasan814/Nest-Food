import { SupplierController } from './controllers/supplier.controller';
import { SupplierService } from './services/supplier.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule { }
