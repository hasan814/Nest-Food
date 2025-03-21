import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { UserAddressEntity } from "./address.entity";
import { BaseEntity } from "src/common/abstract/base.entity";
import { EntityName } from "src/common/enums/entity.enum";


@Entity(EntityName.User)
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  first_name: string;
  @Column({ nullable: true })
  last_name: string
  @Column({ nullable: true })
  mobile: string
  @Column({ nullable: true, unique: true })
  email: string
  @Column({ unique: true })
  invite_code: string
  @Column({ default: 0 })
  score: number
  @Column({ nullable: true })
  agentId: number
  @CreateDateColumn()
  created_at: Date
  @UpdateDateColumn()
  update_at: Date
  @OneToMany(() => UserAddressEntity, address => address.user)
  addressList: UserAddressEntity[]
}
