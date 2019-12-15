import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { IUser } from '@src/models';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: '' })
  authority: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  convert(token: string): IUser {
    const authority = this.authority.split(',');
    const allowedPaths = (authority.includes('admin'))
     ? ['/']
     : [
       '/Movies',
       '/Comics',
       '/TV_Programs',
       '/Musics',
     ];

    return {
      token,
      authority,
      allowedPaths,
      id: this.id,
      username: this.username,
    };
  }
}
