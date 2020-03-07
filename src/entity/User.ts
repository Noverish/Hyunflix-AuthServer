import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  authority: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
