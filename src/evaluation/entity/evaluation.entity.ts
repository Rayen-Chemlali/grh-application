import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import {AnnualGoalEntity} from "../../annual-goal/entity/annual-goal.entity";

@Entity('evaluations')
export class EvaluationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comments: string;

  @Column({ type: 'date' })
  evaluationDate: Date;

  @Column({ type: 'enum', enum: ['A', 'B', 'C', 'D', 'E', 'F'], nullable: true })
  employeeRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

  @Column({ type: 'enum', enum: ['A', 'B', 'C', 'D', 'E', 'F'], nullable: true })
  managerRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

  @ManyToOne(() => UserEntity, user => user.evaluations,{onDelete:'CASCADE'})
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => UserEntity, user => user.managerEvaluations,{onDelete:'CASCADE'})
  @JoinColumn({ name: 'manager_id' })
  manager: UserEntity;

  @Column({ type: 'text', nullable: true })
  managerFeedback?: string;

  @Column({ type: 'text', nullable: true })
  employeeFeedback?: string;

  @ManyToOne(() => AnnualGoalEntity, goal => goal.evaluations, { onDelete: 'CASCADE' })
  goal: AnnualGoalEntity;

}
