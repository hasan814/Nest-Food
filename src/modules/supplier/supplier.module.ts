import { SupplierController } from './controllers/supplier.controller';
import { SupplierOTPEntity } from './entities/supplier-otp.entity';
import { SupplierService } from './services/supplier.service';
import { CategoryService } from '../category/services/category.service';
import { SupplierEntity } from './entities/supplier.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { S3Service } from '../s3/s3.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierEntity, SupplierOTPEntity, CategoryEntity]),
    CategoryModule,
  ],
  controllers: [SupplierController],
  providers: [SupplierService, S3Service, CategoryService, JwtService],
  exports: [SupplierService, JwtService, S3Service, TypeOrmModule]
})
export class SupplierModule { }
