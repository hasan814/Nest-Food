import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @CreateDateColumn({ type: "time with time zone" })
  created_at: Date
}