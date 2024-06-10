import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User_Role {
  @PrimaryColumn('uuid')
  user_id: string; // 회원가입한 유저 id

  @Column({ type: 'int', default: 1 })
  role_id: number; // 역활 id
}
