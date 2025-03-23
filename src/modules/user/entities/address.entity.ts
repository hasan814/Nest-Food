import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { PaymentEntity } from "src/modules/payment/entities/payment.entity";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "./user.entity";


@Entity(EntityName.Address)
export class AddressEntity extends BaseEntity {
  @Column()
  title: string

  @Column()
  province: string

  @Column()
  city: string

  @Column()
  address: string

  @Column({ nullable: true })
  postal_code: string

  @Column()
  userId: number

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => UserEntity, user => user.addressList, { onDelete: "CASCADE" })
  user: UserEntity

  @OneToMany(() => OrderEntity, order => order.address)
  orders: OrderEntity[];

  @OneToMany(() => PaymentEntity, payment => payment.user)
  payments: PaymentEntity[];


}