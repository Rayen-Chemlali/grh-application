import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from "../../user/entity/user.entity";
import { EvaluationEntity } from "../../evaluation/entity/evaluation.entity";

@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @Column({ type: 'enum', enum: ['Planned', 'InProgress', 'Completed', 'OnHold'], default: 'Planned' })
    status: string;

    @ManyToMany(() => UserEntity, user => user.projects)
    @JoinTable()
    users: UserEntity[];

    @ManyToOne(() => UserEntity, user => user.managedProjects, { nullable: true })
    projectManager: UserEntity;

}
