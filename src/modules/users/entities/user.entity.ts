import { Base } from 'src/modules/bases/entities/base.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Company, (item) => item.user, { nullable: true })
  companies: Company[];
}
