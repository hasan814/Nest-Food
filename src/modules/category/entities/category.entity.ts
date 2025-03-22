import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/abstract/base-entity';
import { EntityName } from 'src/common/enums/entity.enum';

@Entity(EntityName.Category)
export class CategoryEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  show: boolean;

  @Column({ nullable: true })
  parentId?: number;

  @Column()
  image: string;
}
