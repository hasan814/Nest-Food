import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { OrderEntity } from "src/modules/order/entities/order.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";


@Entity(EntityName.Payment)
export class PaymentEntity extends BaseEntity {
  @Column({ default: false })
  status: boolean

  @Column()
  amount: number

  @Column()
  invoice_number: string

  @Column({ nullable: true })
  authority: string

  @Column()
  userId: number

  @Column()
  orderId: number

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => UserEntity, user => user.payments, { onDelete: "CASCADE" })
  user: UserEntity

  @ManyToOne(() => OrderEntity, order => order.payments, { onDelete: "CASCADE" })
  order: OrderEntity

}
