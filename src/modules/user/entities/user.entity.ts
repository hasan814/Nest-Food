import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { OrderItemEntity } from "src/modules/order/entities/order-items.entity";
import { FeedbackEntity } from "src/modules/menu/entities/feedback.entity";
import { AddressEntity } from "./address.entity";
import { PaymentEntity } from "src/modules/payment/entities/payment.entity";
import { BasketEntity } from "src/modules/basket/entities/basket.entity";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { OTPEntity } from "./otp.entity";

@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  last_name: string

  @Column({ unique: true })
  mobile: string

  @Column({ nullable: true, unique: true })
  email: string

  @Column({ unique: true, nullable: true })
  invite_code: string

  @Column({ default: 0 })
  score: number

  @Column({ nullable: true })
  agentId: number

  @Column({ nullable: true, default: false })
  mobile_verify: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ nullable: true })
  otpId: number

  @OneToMany(() => AddressEntity, address => address.user)
  addressList: AddressEntity[]

  @OneToMany(() => FeedbackEntity, feedback => feedback.user)
  feedbacks: FeedbackEntity[]

  @OneToMany(() => BasketEntity, basket => basket.user)
  basket: BasketEntity[]

  @OneToOne(() => OTPEntity, otp => otp.user)
  @JoinColumn()
  otp: OTPEntity

  @OneToMany(() => OrderItemEntity, orderItem => orderItem.food)
  orderItems: OrderItemEntity[];

  @OneToMany(() => OrderEntity, order => order.user)
  orders: OrderEntity[];

  @OneToMany(() => PaymentEntity, payment => payment.user)
  payments: PaymentEntity[];

}
