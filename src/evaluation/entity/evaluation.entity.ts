import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("evaluations")
export class EvaluationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comments: string;

  @Column({ type: "date" })
  evaluationDate: Date;

  @Column({ type: "enum", enum: ["A", "B", "C", "D", "E", "F"] })
  rating: "A" | "B" | "C" | "D" | "E" | "F";

  @ManyToOne(() => UserEntity, (user) => user.evaluations)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
