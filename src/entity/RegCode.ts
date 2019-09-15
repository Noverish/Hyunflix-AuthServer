import { Entity, PrimaryColumn, Column, getConnection } from 'typeorm';

@Entity({ name: 'RegisterCode' })
export class RegCode {
  @PrimaryColumn({ name: 'code_id' })
  codeId: number;
  
  @Column({ name: 'user_id', nullable: true })
  userId: number | null;

  @Column()
  realname: string;

  @Column()
  code: string;

  @Column()
  date: Date;

  static async findAll(): Promise<RegCode[]> {
    return await getConnection()
      .getRepository(RegCode)
      .createQueryBuilder()
      .getMany();
  }
  
  static async findById(codeId: number): Promise<RegCode | null> {
    return await getConnection()
      .getRepository(RegCode)
      .createQueryBuilder()
      .where('codeId = :codeId', { codeId })
      .getOne();
  }

  static async findByCode(code: string): Promise<RegCode | null> {
    return await getConnection()
      .getRepository(RegCode)
      .createQueryBuilder()
      .where('code = :code', { code })
      .getOne();
  }

  static async insert(code: string, realname: string): Promise<RegCode> {
    const result =  await getConnection()
      .createQueryBuilder()
      .insert()
      .into(RegCode)
      .values({ code, realname, date: new Date() })
      .execute();
    
    const insertedId = result.identifiers[0].codeId;
    
    return await RegCode.findById(insertedId);
  }
  
  static async updateUserId(codeId: number, userId: number) {
    await getConnection()
      .createQueryBuilder()
      .update(RegCode)
      .set({ userId })
      .where('code_id = :codeId', { codeId })
      .execute();
  }
}
