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
  number?: string;

  @Column({ nullable: true })
  complement?: string;

  @Column({ nullable: true })
  neighborhood?: string;
}
