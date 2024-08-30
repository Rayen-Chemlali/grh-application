import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("projects")
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "date" })
  startDate: Date;

  @Column({ type: "date" })
  endDate: Date;

  @Column({
    type: "enum",
    enum: ["Planned", "InProgress", "Completed", "OnHold"],
    default: "Planned",
  })
  status: string;

  @ManyToMany(() => UserEntity, (user) => user.projects, { nullable: true })
  @JoinTable({
    name: "project_users",
    joinColumn: {
      name: "project_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  users: UserEntity[];

  @ManyToOne(() => UserEntity, (user) => user.managedProjects, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: "project_manager_id" })
  projectManager: UserEntity;
}
