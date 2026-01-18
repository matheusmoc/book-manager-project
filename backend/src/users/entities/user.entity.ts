import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;
}
