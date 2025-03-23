import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { MenuTypeEntity } from "./type.entity";
import { FeedbackEntity } from "./feedback.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";


@Entity(EntityName.Menu)
export class MenuEntity extends BaseEntity {
  @Column()
  image: string

  @Column({ type: "double" })
  price: number

  @Column({ type: "double", default: 0 })
  dicount: number

  @Column({ type: "double" })
  score: number

  @Column()
  description: string

  @Column()
  typeId: number

  @Column()
  supplierId: number

  @ManyToOne(() => SupplierEntity, supplier => supplier.menuTypes, { onDelete: "CASCADE" })
  supplier: SupplierEntity

  @ManyToOne(() => MenuTypeEntity, type => type.items)
  type: MenuTypeEntity

  @OneToMany(() => FeedbackEntity, feedback => feedback.food)
  feedbacks: FeedbackEntity[]
}