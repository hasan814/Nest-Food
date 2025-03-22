import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { EntityName } from 'src/common/enums/entity.enum';

@Entity(EntityName.Category)
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  show: boolean;

  @Column()
  image: string;

  @Column({ nullable: true })
  imageKey: string;

  @Column({ nullable: true })
  parentId?: number;

  @ManyToOne(() => CategoryEntity, category => category.children, { nullable: true, onDelete: 'SET NULL' })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, category => category.parent)
  children: CategoryEntity[];

  @OneToMany(() => SupplierEntity, supplier => supplier.category)
  suppliers: SupplierEntity[];
}


