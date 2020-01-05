import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

import { SessionDTO } from '@src/models';
import { SESSION_ID_LENGTH } from '@src/config';

@Entity()
export class Session extends BaseEntity {
  @PrimaryColumn('char', { length: SESSION_ID_LENGTH })
  id: string;

  @Column()
  userId: number;

  @Column()
  authority: number;

  @Column()
  allowedPaths: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  convert(): SessionDTO {
    return {
      id: this.id,
      userId: this.userId,
      authority: this.authority,
      allowedPaths: this.allowedPaths.split(','),
    };
  }
}
