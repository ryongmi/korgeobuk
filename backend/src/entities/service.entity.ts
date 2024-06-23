import { Entity, Column } from 'typeorm';
import { BaseEntityUUID } from '../common/entities/base.entity';

// Project에서 사용할 엔티티
// 원래는 service라고 이름을 지정하려 했지만, service파일과 이름이 곂쳐
// project로 이름을 변경함
@Entity()
export class Service extends BaseEntityUUID {
  @Column({
    type: 'varchar',
    length: 15,
  })
  name: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  serviceUrl: string;

  @Column({
    type: 'char',
    length: 1,
    comment: 'Y | N',
    default: 'Y',
  })
  useFlag: string;
}
