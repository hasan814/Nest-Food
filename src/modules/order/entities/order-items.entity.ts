import { Column, Entity, ManyToOne } from "typeorm";
import { OrderItemStatus } from "../enums/order-status.enum";
import { OrderEntity } from "./order.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { MenuEntity } from "src/modules/menu/entities/menu.entity";


@Entity(EntityName.OrderItem)
export class OrderItemEntity extends BaseEntity {
  @Column()
  foodId: number

  @Column()
  orderId: number

  @Column()
  count: number

  @Column()
  supplierId: number

  @Column({ type: 'enum', enum: OrderItemStatus, default: OrderItemStatus.Pending })
  status: string

  @ManyToOne(() => MenuEntity, menu => menu.orders, { onDelete: "CASCADE" })
  food: MenuEntity

  @ManyToOne(() => OrderEntity, order => order.items, { onDelete: "CASCADE" })
  order: OrderEntity
}