import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
