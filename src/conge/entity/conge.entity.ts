import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity()
export class CongeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  reason: string;

  @Column({ default: "Pending" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity,{onDelete:'CASCADE'})
  @JoinColumn({ name: "employee_id" })
  employee: UserEntity;

  @ManyToOne(() => UserEntity,{onDelete:'CASCADE'})
  @JoinColumn({ name: "manager_id" })
  manager: UserEntity;
}
