import { Column, Entity, OneToOne } from "typeorm";
import { SupplierEntity } from "./supplier.entity";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";


@Entity(EntityName.SupplierOtp)
export class SupplierOTPEntity extends BaseEntity {
  @Column()
  code: string
  @Column()
  expires_in: Date;
  @Column()
  supplierId: number
  @OneToOne(() => SupplierEntity, supplier => supplier.otp, { onDelete: 'CASCADE' })
  supplier: SupplierEntity
}