import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
} from "typeorm";
import { RoleEntity } from "../../role/entity/role.entity";
import { ProfileEntity } from "../../profile/entity/profile.entity";
import { DocumentEntity } from "../../document/entity/document.entity";
import { AnnualGoalEntity } from "../../annual-goal/entity/annual-goal.entity";
import { ProjectEntity } from "../../project/entity/project.entity";
import { EvaluationEntity } from "../../evaluation/entity/evaluation.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToOne(() => UserEntity, (user) => user.managedEmployees, { onDelete: 'SET NULL' })
  @JoinColumn({ name: "manager_id" })
  manager: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.manager, { cascade: true })
  managedEmployees: UserEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.users, { onDelete: 'SET NULL' })
  @JoinColumn({ name: "role_id" })
  role: RoleEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true, onDelete: 'CASCADE' })
  profile: ProfileEntity;

  @OneToMany(() => DocumentEntity, (document) => document.user, { cascade: true, onDelete: 'CASCADE' })
  documents: DocumentEntity[];

  @OneToMany(() => AnnualGoalEntity, (goal) => goal.user, { cascade: true, onDelete: 'CASCADE' })
  annualGoals: AnnualGoalEntity[];

  @ManyToMany(() => ProjectEntity, (project) => project.users)
  projects: ProjectEntity[];

  @ManyToMany(() => ProjectEntity, (project) => project.users)
  managedProjects: ProjectEntity[];

  @OneToMany(() => EvaluationEntity, (evaluation) => evaluation.user, { cascade: true, onDelete: 'CASCADE' })
  evaluations: EvaluationEntity[];

  @OneToMany(() => EvaluationEntity, (evaluation) => evaluation.manager, { cascade: true, onDelete: 'CASCADE' })
  managerEvaluations: EvaluationEntity[];
}
