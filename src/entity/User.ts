import { Entity, PrimaryGeneratedColumn, Column, getConnection } from 'typeorm';

import { IUser } from '@src/models';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  authority: string;

  @Column()
  date: Date;

  static async findByUsername(username: string): Promise<User | null> {
    return await getConnection()
      .getRepository(User)
      .createQueryBuilder()
      .where('username = :username', { username })
      .getOne();
  }

  static async findById(id: number): Promise<User | null> {
    return await getConnection()
      .getRepository(User)
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  static async insert(username: string, password: string): Promise<number> {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ username, password, authority: '', date: new Date() })
      .execute();

    return result.identifiers[0].id;
  }

  convert(token: string): IUser {
    const authority = this.authority.split(',');
    const allowedPaths = (authority.includes('admin'))
     ? ['/']
     : [
       '/Movies',
       '/torrents',
       '/TV_Programs',
       '/Musics',
     ];

    return {
      token,
      authority,
      allowedPaths,
      id: this.id,
    };
  }
}
