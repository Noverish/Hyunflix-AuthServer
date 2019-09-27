import { Entity, PrimaryGeneratedColumn, Column, getConnection } from 'typeorm';

import { IUser } from '@src/models';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

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

  static async findById(userId: number): Promise<User | null> {
    return await getConnection()
      .getRepository(User)
      .createQueryBuilder()
      .where('userId = :userId', { userId })
      .getOne();
  }

  static async insert(username: string, password: string): Promise<number> {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ username, password, authority: '', date: new Date() })
      .execute();

    return result.identifiers[0].userId;
  }

  convert(token: string): IUser {
    return {
      token,
      userId: this.userId,
      authority: this.authority.split(','),
    };
  }
}
