import { CategoryModule } from '../category/category.module';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(TypeOrmConfig()), UserModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
