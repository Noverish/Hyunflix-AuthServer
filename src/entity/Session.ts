import { Entity, PrimaryColumn, Column, getConnection } from 'typeorm';

@Entity({ name: 'Session' })
export class Session {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @Column()
  token: string;

  @Column({ name: 'user_agent' })
  userAgent: string;
  
  @Column()
  date: Date;

  static async findByToken(token: string): Promise<Session | null> {
    return await getConnection()
      .getRepository(Session)
      .createQueryBuilder()
      .where('token = :token', { token })
      .getOne();
  }

  static async insert(userId: number, token: string, userAgent: string): Promise<Session> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Session)
      .where('user_id = :userId', { userId })
      .execute();
    
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Session)
      .values({ userId, token, userAgent, date: new Date() })
      .execute();

    return await getConnection()
      .getRepository(Session)
      .createQueryBuilder()
      .where('user_id = :userId', { userId })
      .getOne();
  }
}
