import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { SupplierEntity } from "src/modules/supplier/entities/supplier.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { MenuEntity } from "./menu.entity";


@Entity(EntityName.MenuType)
export class MenuTypeEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  supplierId: number;

  @ManyToOne(() => SupplierEntity, supplier => supplier.menuTypes, { onDelete: "CASCADE" })
  supplier: SupplierEntity

  @OneToMany(() => MenuEntity, food => food.type)
  items: MenuEntity[]
}