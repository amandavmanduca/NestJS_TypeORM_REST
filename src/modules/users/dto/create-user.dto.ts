import { Address } from 'src/modules/address.entity';

export class CreateUserDto {
  name: string;

  email: string;

  password: string;

  telephone: string;

  address: Address;
}
