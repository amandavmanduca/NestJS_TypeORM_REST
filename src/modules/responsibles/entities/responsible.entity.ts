import { Address } from 'src/modules/address.entity';
import { Base } from 'src/modules/bases/entities/base.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Responsible extends Base {
  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column(() => Address)
  address: Address;

  @Column({ default: false })
  isMainResponsible: boolean;

  @ManyToOne(() => Company, (item) => item.responsibles, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  company: Company;
}
