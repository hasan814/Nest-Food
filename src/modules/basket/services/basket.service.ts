import { AuthMessage, BadRequestMessage, ConflictMessage, NotFoundMessage, PublicMessage } from 'src/common/enums/message.enum';
import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { BasketDto, DiscountBasketDto } from '../dto/create-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountService } from 'src/modules/discount/services/discount.service';
import { DiscountEntity } from 'src/modules/discount/entities/discount.entity';
import { BasketEntity } from '../entities/basket.entity';
import { MenuService } from 'src/modules/menu/services/menu.service';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity) private basketRepository: Repository<BasketEntity>,
    @InjectRepository(DiscountEntity) private discountRepository: Repository<DiscountEntity>,
    @Inject(REQUEST) private req: Request,
    private discountService: DiscountService,
    private menuService: MenuService,
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

  async removeFormBasket(basketDto: BasketDto) {
    const userId = this.getUserId();
    const { foodId } = basketDto
    const food = await this.menuService.getOne(foodId)
    let basketItem = await this.basketRepository.findOne({
      where: { userId, foodId }
    })
    if (basketItem) {
      if (basketItem.count <= 1) {
        await this.basketRepository.delete({ id: basketItem.id })
      } else {

        basketItem.count -= 1
        await this.basketRepository.save(basketItem)
      }
      return { message: PublicMessage.Deleted }
    }
    throw new NotFoundException(NotFoundMessage.NotFoundCategory)
  }


  async getBasket() { }

  async addDisount(discountDto: DiscountBasketDto) {
    const { code } = discountDto
    const userId = this.getUserId();
    const discount = await this.discountService.findOneByCode(code)
    const userBasketDiscount = await this.basketRepository.findBy({ discountId: discount.id, userId })
    if (!userBasketDiscount) throw new BadRequestException(BadRequestMessage.InvalidBasketData)
    if (discount.supplierId) {
      const discountOfSupplier = await this.basketRepository.findOne({
        relations: { discount: true },
        where: {
          userId,
          discount: { supplierId: discount.supplierId }
        },
      })
      if (discountOfSupplier) throw new BadRequestException(ConflictMessage.ItemAlreadyInBasket)
      const userBasket = await this.basketRepository.findOne({
        relations: { food: true },
        where: { userId, food: { supplierId: discount.supplierId } },
      })
      if (!userBasket) throw new BadRequestException(ConflictMessage.Exist)
    }
    await this.basketRepository.insert({ discountId: discount.id, userId })
    return { message: PublicMessage.Registered }
  }

  async removeDisount(discountDto: DiscountBasketDto) {
    const { code } = discountDto
    const userId = this.getUserId();
    const discount = await this.discountService.findOneByCode(code)
    const basketDiscount = await this.basketRepository.findOne({ where: { discountId: discount.id } })
    if (!basketDiscount) throw new BadRequestException(ConflictMessage.Exist)
    await this.basketRepository.delete({ discountId: discount.id, userId })
    return { message: PublicMessage.Deleted }
  }
}
