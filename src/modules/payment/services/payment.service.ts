import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { PaymentDataDto, PaymentDto } from '../dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ZarinpalService } from 'src/modules/http/http.service';
import { BasketService } from 'src/modules/basket/services/basket.service';
import { PaymentEntity } from '../entities/payment.entity';
import { OrderService } from 'src/modules/order/services/order.service';
import { OrderStatus } from 'src/modules/order/enums/order-status.enum';
import { AuthMessage } from 'src/common/enums/message.enum';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>,
    @Inject(REQUEST) private req: Request,
    private basketService: BasketService,
    private zarinpalService: ZarinpalService,
    private orderService: OrderService,
  ) { }

  private getUserId(): number {
    const user = this.req.user;
    if (!user || typeof user.id !== "number") throw new Error(AuthMessage.LoginAgain);
    return user.id;
  }

  async getGatewayUrl(paymentDto: PaymentDto) {
    const userId = this.getUserId();
    const basket = await this.basketService.getBasket()
    const order = await this.orderService.create(basket, paymentDto)
    const payment = await this.create({
      userId,
      orderId: order.id,
      amount: basket.payment_amount,
      status: basket.payment_amount === 0,
      invoice_number: new Date().getTime().toString()
    })
    if (payment.status) {
      const { authority, code, gatewayURL } = await this.zarinpalService.sendRequest({
        amount: basket.payment_amount,
        description: "PAYMENT ORDER",
        user: { email: "", mobile: "" }
      })
      payment.authority = authority
      await this.paymentRepository.save(payment)
      return { code, gatewayURL }
    }
    return { message: "Payment Successfully" }
  }

  async create(paymentDto: PaymentDataDto) {
    const { amount, invoice_number, orderId, status, userId } = paymentDto
    const payment = await this.paymentRepository.create({
      amount,
      userId,
      orderId,
      status,
      invoice_number,
    })
    return await this.paymentRepository.save(payment)
  }

  async verify(authority: string, status: string) {
    const payment = await this.paymentRepository.findOneBy({ authority })
    if (!payment) throw new NotFoundException()
    if (payment.status) throw new ConflictException("already verified")
    if (status === "OK") {
      const order = await this.orderService.findOne(payment.orderId)
      order.status = OrderStatus.Paid
      await this.orderService.save(order)
      payment.status = true
    } else {
      throw new BadRequestException("Payment Failed")
    }
    await this.paymentRepository.save(payment)
    return "https://frontend.com/payment?status=success"
  }

}
