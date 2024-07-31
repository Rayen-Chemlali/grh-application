import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity()
export class DocumentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    description : string;

    @Column()
    path: string;

    @ManyToOne(() => UserEntity, (user) => user.documents)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;
}
