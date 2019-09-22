import { Entity, PrimaryGeneratedColumn, Column, getConnection } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
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

  static async findByUserId(user_id: number): Promise<User | null> {
    return await getConnection()
      .getRepository(User)
      .createQueryBuilder()
      .where('user_id = :user_id', { user_id })
      .getOne();
  }

  static async insert(username: string, password: string): Promise<User> {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ username, password, authority: '', date: new Date() })
      .execute();
    
    const insertedId = result.identifiers[0].userId;
    
    return await User.findByUserId(insertedId);
  }
}
