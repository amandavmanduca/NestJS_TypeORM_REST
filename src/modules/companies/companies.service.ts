import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkValidUUID } from 'src/common/checkValidUUID';
import { Repository } from 'typeorm';
import { Responsible } from '../responsibles/entities/responsible.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Responsible)
    private responsibleRepository: Repository<Responsible>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany: Company =
      this.companyRepository.create(createCompanyDto);

    const savedCompany = await this.companyRepository.save(createdCompany);

    if (createCompanyDto.responsibles) {
      await this.handleCreateCompanyResponsibles(
        savedCompany.id,
        createCompanyDto.responsibles,
      );
    }

    return savedCompany;
  }

  async handleCreateCompanyResponsibles(
    companyId: string,
    responsiblesArray: Responsible[],
  ) {
    await Promise.all(
      responsiblesArray.map(async (responsible: Responsible) => {
        const createdResponsible = this.responsibleRepository.create({
          ...responsible,
          company: {
            id: companyId,
          },
        });
        await this.responsibleRepository.save(createdResponsible);
      }),
    );
  }

  async handleUpdateCompanyResponsibles(
    companyId: string,
    responsiblesArray: Responsible[],
    previousResponsibles: Responsible[],
  ) {
    let responsiblesToRemove: Responsible[] = previousResponsibles;
    await Promise.all(
      responsiblesArray.map(async (responsible: Responsible) => {
        if (responsible.id) {
          responsiblesToRemove = responsiblesToRemove?.filter(
            (res) => res.id !== responsible.id,
          );
          const foundResponsible = this.responsibleRepository.findOne({
            where: {
              id: responsible.id,
            },
          });
          const createdResponsible = this.responsibleRepository.create({
            ...foundResponsible,
            ...responsible,
          });
          await this.responsibleRepository.save(createdResponsible);
        } else {
          const createdResponsible = this.responsibleRepository.create({
            ...responsible,
            company: {
              id: companyId,
            },
          });
          await this.responsibleRepository.save(createdResponsible);
        }
      }),
    );
    await Promise.all(
      responsiblesToRemove?.map(
        async (oldResponsible) =>
          oldResponsible.id &&
          (await this.responsibleRepository.delete(oldResponsible.id)),
      ),
    );
  }

  async findAll(): Promise<Company[]> {
    const companies: Company[] = await this.companyRepository.find();
    return companies;
  }

  async findOne(id: string): Promise<Company> {
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundCompany: Company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
      relations: ['places', 'responsibles'],
    });
    if (!foundCompany) {
      throw new NotFoundException('Empresa não encontrada');
    }
    return foundCompany;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundCompany: Company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundCompany) {
      throw new NotFoundException('Empresa não encontrada');
    }
    const updatedCompany: Company = this.companyRepository.create({
      ...foundCompany,
      ...updateCompanyDto,
    });
    const savedCompany: Company = await this.companyRepository.save(
      updatedCompany,
    );

    if (updateCompanyDto.responsibles) {
      await this.handleUpdateCompanyResponsibles(
        savedCompany.id,
        updateCompanyDto.responsibles,
        savedCompany.responsibles,
      );
    }
    return savedCompany;
  }

  async remove(id: string) {
    if (!id || checkValidUUID(id) === false) {
      throw new BadRequestException('Campos inválidos');
    }
    const foundCompany: Company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundCompany) {
      throw new NotFoundException('Empresa não encontrada');
    }
    await this.companyRepository.delete(foundCompany.id);
  }
}
