import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nom: string;

  @Column({ nullable: true })
  prenom: string;

  @Column({ nullable: true })
  pole: string;

  @Column({ nullable: true })
  domaine: string;

  @Column({ nullable: true })
  metier: string;

  @Column({ nullable: true })
  filiere: string;

  @Column({ nullable: true })
  lieuDeTravail: string;

  @Column({ nullable: true })
  responsable: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  civilite: string;

  @Column({ nullable: true })
  sexe: string;

  @Column({ nullable: true })
  nationalite: string;

  @Column({ nullable: true })
  dateEtLieuDeNaissance: string;

  @Column({ nullable: true })
  adresseDomicile: string;

  @Column({ nullable: true })
  image: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
