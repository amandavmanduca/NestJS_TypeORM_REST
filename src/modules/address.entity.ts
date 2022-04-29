import { Column } from 'typeorm';

export class Address {
  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  cep?: string;

  @Column()
  street?: string;

  @Column()
  number?: number;

  @Column({ nullable: true })
  complement?: string;
}
