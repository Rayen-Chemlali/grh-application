import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity.ts';

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[];
}
