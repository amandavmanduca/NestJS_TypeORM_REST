import { Address } from 'src/modules/address.entity';
import { Base } from 'src/modules/bases/entities/base.entity';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Place extends Base {
  @Column()
  name: string;

  @Column(() => Address)
  address: Address;

  @OneToMany(() => Ticket, (item) => item.place, { nullable: true })
  tickets: Ticket[];
}
