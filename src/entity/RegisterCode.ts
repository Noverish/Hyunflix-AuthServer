import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, getConnection } from 'typeorm';

import { User } from '@src/entity';
import { IRegisterCode } from '@src/models';
import { dateToString } from '@src/utils';

@Entity()
export class RegisterCode {
  @PrimaryGeneratedColumn()
  codeId: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User | null;

  @Column()
  realname: string;

  @Column()
  code: string;

  @Column()
  date: Date;

  static async findAll(): Promise<RegisterCode[]> {
    return await getConnection()
      .getRepository(RegisterCode)
      .createQueryBuilder()
      .leftJoinAndSelect('RegisterCode.user', 'user')
      .getMany();
  }

  static async findById(codeId: number): Promise<RegisterCode | null> {
    return await getConnection()
      .getRepository(RegisterCode)
      .createQueryBuilder()
      .leftJoinAndSelect('RegisterCode.user', 'user')
      .where('codeId = :codeId', { codeId })
      .getOne();
  }

  static async findByCode(code: string): Promise<RegisterCode | null> {
    return await getConnection()
      .getRepository(RegisterCode)
      .createQueryBuilder()
      .leftJoinAndSelect('RegisterCode.user', 'user')
      .where('code = :code', { code })
      .getOne();
  }

  static async insert(code: string, realname: string): Promise<number> {
    const result =  await getConnection()
      .createQueryBuilder()
      .insert()
      .into(RegisterCode)
      .values({ code, realname, date: new Date() })
      .execute();

    return result.identifiers[0].codeId;
  }

  static async updateUser(codeId: number, user: User): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(RegisterCode)
      .set({ user })
      .where('codeId = :codeId', { codeId })
      .execute();
  }

  convert(): IRegisterCode {
    return {
      codeId: this.codeId,
      user: (this.user) ? this.user.convert('') : null,
      realname: this.realname,
      code: this.code,
      date: dateToString(this.date),
    };
  }
}
