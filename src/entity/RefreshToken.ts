import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @Column('varchar', { length: 1023 })
  token: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
