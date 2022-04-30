import { Address } from 'src/modules/address.entity';
import { Base } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Responsible extends Base {
  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column(() => Address)
  address: Address;
}
