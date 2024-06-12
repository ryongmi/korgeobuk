import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryColumn('uuid')
  userId: string; // 회원가입한 유저 id

  @Column({ type: 'int', default: 1 })
  roleId: number; // 역활 id
}
