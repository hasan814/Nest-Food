import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryEntity } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from '../s3/s3.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService, S3Service],
})
export class CategoryModule { }
