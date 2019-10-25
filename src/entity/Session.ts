import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { User } from '@src/entity';

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User | null;

  @Column({ length: 1024 })
  token: string;

  @Column({ length: 1024 })
  userAgent: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
