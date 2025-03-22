import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { SupplierOTPEntity } from "./supplier-otp.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { SupplierStatus } from "src/common/enums/message.enum";


@Entity(EntityName.Supplier)
export class SupplierEntity extends BaseEntity {
  @Column()
  manager_name: string
  @Column()
  manager_family: string;

  @Column()
  store_name: string;

  @Column()
  phone: string;

  @Column()
  invite_code: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  national_code: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true, default: SupplierStatus.Register })
  status: string;

  @Column({ nullable: true })
  agentId: number;

  @Column({ nullable: true, default: false })
  mobile_verify: boolean;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, category => category.suppliers, { onDelete: "SET NULL" })
  category: CategoryEntity

  @ManyToOne(() => SupplierEntity, supplier => supplier.subsets)
  agent: SupplierEntity

  @OneToMany(() => SupplierEntity, supplier => supplier.agent)
  subsets: SupplierEntity[]

  @Column({ nullable: true })
  otpId: number

  @OneToOne(() => SupplierOTPEntity, otp => otp.supplier)
  @JoinColumn()
  otp: SupplierOTPEntity
}
