import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { OrderItemEntity } from "./order-items.entity";
import { AddressEntity } from "src/modules/user/entities/address.entity";
import { PaymentEntity } from "src/modules/payment/entities/payment.entity";
import { OrderStatus } from "../enums/order-status.enum";
import { BaseEntity } from "src/common/abstract/base-entity";
import { UserEntity } from "src/modules/user/entities/user.entity";


@Entity()
export class OrderEntity extends BaseEntity {
  @Column()
  userId: number;

  @Column({ nullable: true })
  addressId: number;

  @Column()
  payment_amount: number;

  @Column()
  discount_amount: number;

  @Column()
  total_amount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: string;

  @Column({ nullable: true })
  discription: string;

  @ManyToOne(() => UserEntity, user => user.orders, { onDelete: "CASCADE" })
  user: UserEntity

  @ManyToOne(() => AddressEntity, address => address.orders, { onDelete: "SET NULL" })
  address: AddressEntity

  @OneToMany(() => OrderItemEntity, item => item.order)
  items: OrderItemEntity[]

  @OneToMany(() => PaymentEntity, payment => payment.order)
  payments: PaymentEntity[]

}
