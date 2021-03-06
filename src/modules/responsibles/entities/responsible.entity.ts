import { Address } from 'src/modules/address.entity';
import { Base } from 'src/modules/bases/entities/base.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Place } from 'src/modules/places/entities/place.entity';
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
  isCompanyMainResponsible: boolean;

  @Column({ default: false })
  isPlaceMainResponsible: boolean;

  @ManyToOne(() => Company, (item) => item.responsibles, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  company: Company;

  @ManyToOne(() => Place, (item) => item.responsibles, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  place: Place;
}
