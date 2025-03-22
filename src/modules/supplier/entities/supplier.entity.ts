import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";


@Entity(EntityName.Supplier)
export class SupplierEntity extends BaseEntity {
  @Column()
  manager_name: string
  @Column()
  manager_family: string;

  @Column()
  store_name: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column()
  invite_code: string;

  @Column({ nullable: true })
  agentId: number;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => CategoryEntity, category => category.suppliers, { onDelete: "SET NULL" })
  category: CategoryEntity

  @ManyToOne(() => SupplierEntity, supplier => supplier.subsets)
  agent: SupplierEntity

  @OneToMany(() => SupplierEntity, supplier => supplier.agent)
  subsets: SupplierEntity[]
}
