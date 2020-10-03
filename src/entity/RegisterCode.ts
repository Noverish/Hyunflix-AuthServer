import {
  Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,
} from 'typeorm';

import { User } from '@src/entity';

@Entity()
class RegisterCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User | null;

  @Column()
  realname: string;

  @Column()
  code: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}

export default RegisterCode;
