import { AuthMessage, PublicMessage } from 'src/common/enums/message.enum';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from '../entities/basket.entity';
import { MenuService } from 'src/modules/menu/services/menu.service';
import { Repository } from 'typeorm';
import { BasketDto } from '../dto/create-basket.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity) private basketRepository: Repository<BasketEntity>,
    @Inject(REQUEST) private req: Request,
    private menuService: MenuService
  ) { }

  private getUserId(): number {
    const user = this.req.user;
    if (!user || typeof user.id !== "number") throw new Error(AuthMessage.LoginAgain);
    return user.id;
  }

  async addToBasket(basketDto: BasketDto) {
    const userId = this.getUserId();
    const { foodId } = basketDto
    const food = await this.menuService.getOne(foodId)
    let basketItem = await this.basketRepository.findOne({
      where: { userId, foodId }
    })
    if (basketItem) basketItem.count += 1
    else basketItem = this.basketRepository.create({ foodId, userId, count: 1 })
    await this.basketRepository.save(basketItem)
    return { message: PublicMessage.Created }
  }
  async removeFormBasket() { }
  async getBasket() { }
  async addDisount() { }
  async removeDisount() { }
}
