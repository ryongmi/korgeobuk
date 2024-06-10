import { BaseEntityIncrement } from '../common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Role extends BaseEntityIncrement {
  @Column({
    type: 'varchar',
    length: 15,
  })
  name: string;
}
