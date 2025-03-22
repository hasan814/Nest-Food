import { UserController } from './controllers/user.controller';
import { AddressEntity } from './entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AddressEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
