import { Inject, Injectable, Scope } from '@nestjs/common';
import { BasketService } from 'src/modules/basket/services/basket.service';
import { AuthMessage } from 'src/common/enums/message.enum';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class PaymentService {
  constructor(
    @Inject(REQUEST) private req: Request,
    private basketService: BasketService
  ) { }

  private getUserId(): number {
    const user = this.req.user;
    if (!user || typeof user.id !== "number") throw new Error(AuthMessage.LoginAgain);
    return user.id;
  }

  async getGatewayUrl() {
    const userId = this.getUserId();
    const basket = await this.basketService.getBasket()
    return basket
  }
}
