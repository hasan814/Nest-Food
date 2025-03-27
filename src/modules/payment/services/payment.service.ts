import { Inject, Injectable, Scope } from '@nestjs/common';
import { BasketService } from 'src/modules/basket/services/basket.service';
import { AuthMessage } from 'src/common/enums/message.enum';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ZarinpalService } from 'src/modules/http/http.service';

@Injectable({ scope: Scope.REQUEST })
export class PaymentService {
  constructor(
    @Inject(REQUEST) private req: Request,
    private basketService: BasketService,
    private zarinpalService: ZarinpalService,
  ) { }

  private getUserId(): number {
    const user = this.req.user;
    if (!user || typeof user.id !== "number") throw new Error(AuthMessage.LoginAgain);
    return user.id;
  }

  async getGatewayUrl() {
    const userId = this.getUserId();
    const basket = await this.basketService.getBasket()
    return this.zarinpalService.sendRequest({
      amount: basket.payment_amount,
      description: "PAYMENT ORDER",
      user: { email: "", mobile: "" }
    })
  }
}
