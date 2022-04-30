import { Responsible } from 'src/modules/responsibles/entities/responsible.entity';

export class CreateCompanyDto {
  name: string;

  cnpj: string;

  description: string;

  responsibles: Responsible[];
}
