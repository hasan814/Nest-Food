import { BasketDto, DiscountBasketDto } from '../dto/create-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountService } from 'src/modules/discount/services/discount.service';
import { DiscountEntity } from 'src/modules/discount/entities/discount.entity';
import { BasketMessage } from '../enums/messgae.enum';
import { BasketEntity } from '../entities/basket.entity';
import { MenuService } from 'src/modules/menu/services/menu.service';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';

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
    if (!user || typeof user.id !== 'number') {
      throw new Error(BasketMessage.USER_NOT_FOUND);
    }
    return user.id;
  }

  async addToBasket(basketDto: BasketDto) {
    const userId = this.getUserId();
    const { foodId } = basketDto;

    const food = await this.menuService.getOne(foodId);

    let basketItem = await this.basketRepository.findOne({
      where: { userId, foodId },
    });

    if (basketItem) {
      basketItem.count += 1;
    } else {
      basketItem = this.basketRepository.create({ foodId, userId, count: 1 });
    }

    await this.basketRepository.save(basketItem);
    return { message: 'Added to basket' };
  }

  async removeFormBasket(basketDto: BasketDto) {
    const userId = this.getUserId();
    const { foodId } = basketDto;

    const food = await this.menuService.getOne(foodId);

    const basketItem = await this.basketRepository.findOne({
      where: { userId, foodId },
    });

    if (basketItem) {
      if (basketItem.count <= 1) {
        await this.basketRepository.delete({ id: basketItem.id });
      } else {
        basketItem.count -= 1;
        await this.basketRepository.save(basketItem);
      }
      return { message: 'Removed from basket' };
    }

    throw new NotFoundException(BasketMessage.BASKET_ITEM_NOT_FOUND);
  }

  async getBasket() {
    const userId = this.getUserId();
    const basketItems = await this.basketRepository.find({
      relations: {
        discount: true,
        food: { supplier: true },
      },
      where: { userId },
    });
    const foods = basketItems.filter(item => item.foodId);
    const generalDiscountItem = basketItems.find(item => item?.discount?.id && !item.discount.supplierId);
    let totalAmount = 0;
    let paymentAmount = 0;
    let totalDiscountAmount = 0;
    const foodList = [];
    for (const item of foods) {
      const { food, count } = item;
      let foodPrice = food.price;
      let discountAmount = 0;
      let discountCode: string | null = null;
      totalAmount += food.price * count;
      const supplierId = food.supplierId;
      if (food.is_active && food.discount > 0) {
        const foodDiscount = food.price * (food.discount / 100);
        discountAmount += foodDiscount;
        foodPrice -= foodDiscount;
      }
      if (generalDiscountItem?.discount?.supplierId === supplierId) {
        const supplierDiscount = generalDiscountItem.discount;
        if (supplierDiscount.active && (!supplierDiscount.limit || supplierDiscount.limit > supplierDiscount.usage)) {
          discountCode = supplierDiscount.code;
          if (supplierDiscount.percent && supplierDiscount.percent > 0) {
            const percentDiscount = foodPrice * (supplierDiscount.percent / 100);
            discountAmount += percentDiscount;
            foodPrice -= percentDiscount;
          } else if (supplierDiscount.amount && supplierDiscount.amount > 0) {
            discountAmount += supplierDiscount.amount;
            foodPrice = Math.max(0, foodPrice - supplierDiscount.amount);
          }
        }
      }
      paymentAmount += foodPrice * count;
      totalDiscountAmount += discountAmount;
      let foodList: FoodItem[] = [];
      foodList.push({
        name: food.name,
        description: food.description,
        count,
        image: food.image,
        price: food.price,
        total_amount: food.price * count,
        discount_amount: discountAmount,
        payment_amount: food.price * count - discountAmount,
        discountCode,
        supplierId,
        supplierName: food?.supplier?.store_name,
        supplierImage: food?.supplier?.image,
      });
    }
    let generalDiscountDetail = {};
    const generalDiscount = generalDiscountItem?.discount;
    if (generalDiscount?.active && (!generalDiscount.limit || generalDiscount.limit > generalDiscount.usage)) {
      let discountAmount = 0;
      if (generalDiscount.percent > 0) discountAmount = totalAmount * (generalDiscount.percent / 100);
      else if (generalDiscount.amount > 0) discountAmount = generalDiscount.amount;
      totalAmount = Math.max(0, totalAmount - discountAmount);
      totalDiscountAmount += discountAmount;
      generalDiscountDetail = {
        code: generalDiscount.code,
        percent: generalDiscount.percent,
        amount: generalDiscount.amount,
        discount_amount: discountAmount,
      };
    }
    return {
      total_amount: totalAmount,
      payment_amount: paymentAmount,
      total_discount_amount: totalDiscountAmount,
      foodList,
      generalDiscountDetail,
    };
  }

  async addDiscount(discountDto: DiscountBasketDto) {
    const { code } = discountDto;
    const userId = this.getUserId();
    const discount = await this.discountService.findOneByCode(code);
    if (!discount || !discount.active)
      throw new BadRequestException(BasketMessage.DISCOUNT_NOT_FOUND_OR_INACTIVE);
    if (discount.limit && discount.usage >= discount.limit)
      throw new BadRequestException(BasketMessage.DISCOUNT_LIMIT_REACHED);
    if (discount.expires_in && discount.expires_in.getTime() <= Date.now())
      throw new BadRequestException(BasketMessage.DISCOUNT_EXPIRED);
    const existing = await this.basketRepository.findOneBy({
      userId,
      discountId: discount.id,
    });
    if (existing)
      throw new ConflictException(BasketMessage.DISCOUNT_ALREADY_USED);
    if (discount.supplierId) {
      const supplierConflict = await this.basketRepository.findOne({
        relations: { discount: true },
        where: {
          userId,
          discount: { supplierId: discount.supplierId },
        },
      });
      if (supplierConflict)
        throw new ConflictException(BasketMessage.SUPPLIER_DISCOUNT_CONFLICT);
      const hasFoodFromSupplier = await this.basketRepository.findOne({
        relations: { food: true },
        where: { userId, food: { supplierId: discount.supplierId } },
      });
      if (!hasFoodFromSupplier)
        throw new BadRequestException(BasketMessage.SUPPLIER_HAS_NO_ITEMS);
    }
    const userBasketItems = await this.basketRepository.find({
      where: { userId },
    });
    if (userBasketItems.length === 0)
      throw new BadRequestException(BasketMessage.EMPTY_BASKET);
    for (const item of userBasketItems) {
      item.discount = discount;
      item.discountId = discount.id;
      await this.basketRepository.save(item);
    }
    return { message: 'Discount applied' };
  }

  async removeDiscount(discountDto: DiscountBasketDto) {
    const { code } = discountDto;
    const userId = this.getUserId();
    const discount = await this.discountService.findOneByCode(code);
    const basketDiscount = await this.basketRepository.findOne({
      where: { discountId: discount.id, userId },
    });
    if (!basketDiscount)
      throw new BadRequestException(BasketMessage.DISCOUNT_NOT_FOUND_IN_BASKET);
    await this.basketRepository.delete({
      discountId: discount.id,
      userId,
    });
    return { message: 'Discount removed' };
  }
}
