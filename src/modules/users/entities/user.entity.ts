import { Base } from 'src/modules/bases/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
