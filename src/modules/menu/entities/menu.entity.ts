import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { MenuTypeEntity } from "./type.entity";
import { FeedbackEntity } from "./feedback.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { BasketEntity } from "src/modules/basket/entities/basket.entity";


@Entity(EntityName.Menu)
export class MenuEntity extends BaseEntity {
  @Column()
  image: string

  @Column()
  name: string

  @Column()
  key: string

  @Column({ type: "double" })
  price: number

  @Column({ type: "double", default: 0 })
  discount: number

  @Column({ type: "double" })
  score: number

  @Column()
  description: string

  @Column()
  typeId: number

  @Column({ default: true })
  is_active: boolean;


  @Column()
  supplierId: number

  @ManyToOne(() => SupplierEntity, supplier => supplier.menuTypes, { onDelete: "CASCADE" })
  supplier: SupplierEntity

  @ManyToOne(() => MenuTypeEntity, type => type.items)
  type: MenuTypeEntity

  @OneToMany(() => FeedbackEntity, feedback => feedback.food)
  feedbacks: FeedbackEntity[]

  @OneToMany(() => BasketEntity, basket => basket.food)
  baskets: FeedbackEntity[]
}