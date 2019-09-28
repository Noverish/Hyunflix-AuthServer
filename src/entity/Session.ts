import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, getConnection } from 'typeorm';

import { User } from '@src/entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  sessionId: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User | null;

  @Column({ length: 1024 })
  token: string;

  @Column({ length: 1024 })
  userAgent: string;

  @Column()
  date: Date;

  static async findByUser(user: User): Promise<Session | null> {
    return await getConnection()
      .getRepository(Session)
      .createQueryBuilder()
      .leftJoinAndSelect('Session.user', 'user')
      .where('Session.user = :userId', { userId: user.userId })
      .getOne();
  }

  static async findByToken(token: string): Promise<Session | null> {
    return await getConnection()
      .getRepository(Session)
      .createQueryBuilder()
      .leftJoinAndSelect('Session.user', 'user')
      .where('token = :token', { token })
      .getOne();
  }

  static async deleteByUser(user: User): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Session)
      .where('userUserId = :userId', { userId: user.userId })
      .execute();
  }

  static async insert(user: User, token: string, userAgent: string): Promise<number> {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Session)
      .values({ user, token, userAgent, date: new Date() })
      .execute();

    return result.identifiers[0].sessionId;
  }
}
