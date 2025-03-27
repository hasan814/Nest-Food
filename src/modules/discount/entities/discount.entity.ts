import { Column, Entity, OneToMany } from "typeorm";
import { BasketEntity } from "src/modules/basket/entities/basket.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";


@Entity(EntityName.Discount)
export class DiscountEntity extends BaseEntity {
  @Column()
  code: string

  @Column({ type: 'double', nullable: true })
  percent: number

  @Column({ type: 'double', nullable: true })
  amount: number;

  @Column({ nullable: true })
  expires_in: Date;

  @Column({ nullable: true })
  limit: number;

  @Column({ nullable: true, default: 0 })
  usage: number

  @Column({ nullable: true })
  supplierId: number

  @Column({ default: true })
  active: boolean

  @OneToMany(() => BasketEntity, basket => basket.discount)
  baskets: BasketEntity[]
}
