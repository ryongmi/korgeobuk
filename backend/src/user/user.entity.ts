import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  user_id: string; // 회원가입한 사람들 id

  @PrimaryColumn({
    length: 1,
  })
  user_id_type: string; // OAuth, 회원가입 구분용 / G : 구글, N : 네이버, K : 회원가입

  @Column()
  password: string;

  @Column({
    length: 15,
  })
  name: string;

  @Column({
    length: 15,
  })
  nickname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  profile_image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
