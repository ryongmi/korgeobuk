import { Entity, Column } from 'typeorm';
import { BaseEntityUUID } from '../common/entities/base.entity';

@Entity()
export class User extends BaseEntityUUID {
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  userId: string; // 회원가입한 사람들 id

  @Column({ type: 'varchar', length: 255, nullable: true })
  oauthId: string; // Oauth id

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({
    type: 'varchar',
    length: 15,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 15,
  })
  nickname: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string; // 이메일은 무조건 한번만 가입가능하게

  @Column({ type: 'varchar', length: 2048, nullable: true })
  profileImage: string;

  @Column({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
  }) // 현재 시간으로 기본값을 설정
  lastLogin: Date;
}
