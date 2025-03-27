import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { OrderItemStatus, OrderStatus } from '../enums/order-status.enum';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from '../entities/order-items.entity';
import { AddressEntity } from 'src/modules/user/entities/address.entity';
import { AuthMessage } from 'src/common/enums/message.enum';
import { OrderEntity } from '../entities/order.entity';
import { BasketType } from 'src/modules/basket/types/basket-types';
import { PaymentDto } from 'src/modules/payment/dto/payment.dto';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class OrderService {

  constructor(
    @InjectRepository(AddressEntity) private userAddressRepository: Repository<AddressEntity>,
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    @Inject(REQUEST) private req: Request,
    private dataSource: DataSource
  ) { }

  private getUserId(): number {
    const user = this.req.user;
    if (!user || typeof user.id !== "number") throw new Error(AuthMessage.LoginAgain);
    return user.id;
  }

  async create(basket: BasketType, paymentDto: PaymentDto) {
    const { addressId, description = undefined } = paymentDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const userId = this.getUserId();
      const address = await this.userAddressRepository.findOneBy({ id: addressId, userId });
      if (!address) throw new NotFoundException("Address not found.");
      const { foodList, payment_amount, total_amount, total_discount_amount } = basket;
      if (!payment_amount || !total_amount) throw new BadRequestException("Invalid payment or total amount.");
      let order = queryRunner.manager.create(OrderEntity, {
        userId,
        addressId,
        description,
        total_amount,
        payment_amount,
        status: OrderStatus.Pending,
        discount_amount: total_discount_amount,
      });
      order = await queryRunner.manager.save(OrderEntity, order);
      if (foodList.length === 0) throw new BadRequestException("Your food list is empty.");
      const orderItems = foodList.map(item => ({
        orderId: order.id,
        count: item.count,
        foodId: item.foodId,
        supplierId: item.supplierId,
        status: OrderItemStatus.Pending,
      }));
      await queryRunner.manager.insert(OrderItemEntity, orderItems);
      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id })
    if (!order) throw new NotFoundException()
    return order
  }

  async save(order: OrderEntity) {
    return await this.orderRepository.save(order)
  }

}
