import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "./user.entity";


@Entity(EntityName.UserAddress)
export class AddressEntity extends BaseEntity {
  @Column()
  title: string

  @Column()
  province: string

  @Column()
  city: string

  @Column()
  address: string

  @Column({ nullable: true })
  postal_code: string

  @Column()
  userId: number

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => UserEntity, user => user.addressList, { onDelete: "CASCADE" })
  user: UserEntity
}