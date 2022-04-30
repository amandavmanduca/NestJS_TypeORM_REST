import { Address } from 'src/modules/address.entity';

export class CreateResponsibleDto {
  name: string;

  telephone: string;

  address: Address;

  isCompanyMainResponsible: boolean;

  isPlaceMainResponsible: boolean;
}
