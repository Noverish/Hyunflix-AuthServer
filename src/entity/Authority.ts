import {
  Entity, BaseEntity, PrimaryColumn, Column,
} from 'typeorm';

@Entity()
class Authority extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  paths: string;
}

export default Authority;
