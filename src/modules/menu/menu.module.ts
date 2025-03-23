
import { MenuTypeController } from './controllers/type.controller';
import { MenuTypeService } from './services/type.service';
import { MenuController } from './controllers/menu.controller';
import { SupplierModule } from '../supplier/supplier.module';
import { FeedbackEntity } from './entities/feedback.entity';
import { MenuTypeEntity } from './entities/type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './services/menu.service';
import { MenuEntity } from './entities/menu.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SupplierModule,
    TypeOrmModule.forFeature([MenuEntity, MenuTypeEntity, FeedbackEntity])],
  controllers: [MenuController, MenuTypeController],
  providers: [MenuService, MenuTypeService],
})
export class MenuModule { }
