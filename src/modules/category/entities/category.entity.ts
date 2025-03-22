import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('categories')
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
  parentId?: number;

  @ManyToOne(() => CategoryEntity, category => category.children, { nullable: true, onDelete: 'SET NULL' })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, category => category.parent)
  children: CategoryEntity[];
}


