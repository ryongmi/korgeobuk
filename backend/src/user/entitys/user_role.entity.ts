import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User_Role {
  @PrimaryColumn()
  user_id: number; // 회원가입한 유저 id

  @Column({ default: 1 })
  role_id: number; // 역활 id
}
