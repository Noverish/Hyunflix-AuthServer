import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserDTO } from '@src/models';
import { dateToString } from '@src/utils';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  authority: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  convert(): UserDTO {
    return {
      username: this.username,
      date: dateToString(this.date),
    };
  }
}
