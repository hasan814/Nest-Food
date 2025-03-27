import { Controller, Post } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { UserGuard } from 'src/common/decorators/auth.decorator';


@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) { }

  @Post()
  @UserGuard()
  gatewayUrl() {
    return this.paymentService.getGatewayUrl();
  }
}
