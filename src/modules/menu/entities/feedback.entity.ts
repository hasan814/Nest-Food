import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/abstract/base-entity";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { MenuEntity } from "./menu.entity";


@Entity(EntityName.Feedback)
export class FeedbackEntity extends BaseEntity {
  @Column()
  userId: number

  @Column()
  foodId: number

  @Column()
  comment: string

  @Column()
  socre: number

  @ManyToOne(() => UserEntity, user => user.feedbacks, { onDelete: "CASCADE" })
  user: UserEntity

  @ManyToOne(() => MenuEntity, food => food.feedbacks, { onDelete: "CASCADE" })
  food: MenuEntity

  @CreateDateColumn()
  created_at: Date
}
