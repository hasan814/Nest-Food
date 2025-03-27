import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { PaymentDto } from '../dto/payment.dto';
import { UserGuard } from 'src/common/decorators/auth.decorator';
import { Response } from 'express';


@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) { }

  @Post()
  @UserGuard()
  gatewayUrl(@Body() paymentDto: PaymentDto) {
    return this.paymentService.getGatewayUrl(paymentDto);
  }

  @Get('/verify')
  async verifyPayment(
    @Query("Authority") authority: string,
    @Query("Status") status: string,
    @Res() res: Response
  ) {
    const url = await this.paymentService.verify(authority, status)
    return res.redirect(url)
  }
}
