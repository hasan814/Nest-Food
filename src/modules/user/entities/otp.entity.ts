import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "./user.entity";


@Entity(EntityName.UserOtp)
export class OTPEntity extends BaseEntity {
  @Column()
  code: string
  @Column()
  expires_in: Date;
  @Column()
  userId: number
  @OneToOne(() => UserEntity, user => user.otp, { onDelete: 'CASCADE' })
  user: UserEntity
}