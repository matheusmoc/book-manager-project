import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ nullable: true })
  description: string;
}
