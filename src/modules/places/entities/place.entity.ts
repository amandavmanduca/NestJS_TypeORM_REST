import { Address } from 'src/modules/address.entity';
import { Base } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Place extends Base {
  @Column()
  name: string;

  @Column(() => Address)
  address: Address;
}
