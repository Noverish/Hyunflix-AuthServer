import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, getConnection, FindConditions } from 'typeorm';

import { User } from '@src/entity';
import { IRegisterCode } from '@src/models';
import { dateToString } from '@src/utils';

@Entity()
export class RegisterCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => User)
  @JoinColumn()
  user: User | null;

  @Column()
  realname: string;

  @Column()
  code: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  static async $findOne(where?: FindConditions<RegisterCode>): Promise<RegisterCode | null> {
    RegisterCode.findOne();
    
    return await getConnection()
      .getRepository(RegisterCode)
      .findOne({
        where,
        relations: ['user'],
      });
  }

  static async $find(where?: FindConditions<RegisterCode>): Promise<RegisterCode[]> {
    return await getConnection()
      .getRepository(RegisterCode)
      .find({
        where,
        relations: ['user'],
      });
  }

  convert(): IRegisterCode {
    return {
      id: this.id,
      user: (this.user) ? this.user.convert('') : null,
      realname: this.realname,
      code: this.code,
      date: dateToString(this.date),
    };
  }
}
