import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user_id', 'user_id_type'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string; // 회원가입한 사람들 id

  @Column({
    length: 1,
    type: 'char',
    default: 'K',
  })
  user_id_type: string; // OAuth, 회원가입 구분용 / G : 구글, N : 네이버, K : 회원가입

  @Column({ nullable: true })
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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
