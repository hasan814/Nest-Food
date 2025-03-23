import { Column, Entity, ManyToOne } from "typeorm";
import { BasketDiscountType } from "../enums/discount-type";
import { DiscountEntity } from "src/modules/discount/entities/discount.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { MenuEntity } from "src/modules/menu/entities/menu.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";


@Entity(EntityName.UserBasket)
export class BasketEntity extends BaseEntity {
  @Column()
  foodId: string

  @Column()
  userId: string

  @Column()
  count: number

  @Column({ enum: BasketDiscountType, type: "enum", nullable: true })
  type: string

  @Column()
  discountId: number

  @ManyToOne(() => MenuEntity, food => food.baskets, { onDelete: "CASCADE" })
  food: MenuEntity

  @ManyToOne(() => UserEntity, user => user.basket, { onDelete: "CASCADE" })
  user: UserEntity

  @ManyToOne(() => DiscountEntity, discount => discount.baskets, { onDelete: "CASCADE" })
  discount: DiscountEntity
}
