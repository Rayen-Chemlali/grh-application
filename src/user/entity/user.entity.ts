import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { RoleEntity } from "../../role/entity/role.entity";
import { ProfileEntity } from "../../profile/entity/profile.entity";

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

  @ManyToOne(() => UserEntity, (user) => user.managedEmployees)
  @JoinColumn({ name: "manager_id" })
  manager: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.manager)
  managedEmployees: UserEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: RoleEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;
}
