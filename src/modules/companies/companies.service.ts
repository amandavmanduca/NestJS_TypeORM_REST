import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany: Company =
      this.companyRepository.create(createCompanyDto);

    const savedCompany = await this.companyRepository.save(createdCompany);
    return savedCompany;
  }

  async findAll(): Promise<Company[]> {
    const companies: Company[] = await this.companyRepository.find();
    return companies;
  }

  async findOne(id: string): Promise<Company> {
    const foundCompany: Company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
      relations: ['places', 'responsibles', 'user'],
    });
    if (!foundCompany) {
      throw new Error('COMPANY_NOT_FOUND');
    }
    return foundCompany;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const foundCompany: Company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundCompany) {
      throw new Error('COMPANY_NOT_FOUND');
    }
    const updatedCompany: Company = this.companyRepository.create({
      ...foundCompany,
      ...updateCompanyDto,
    });
    const savedCompany: Company = await this.companyRepository.save(
      updatedCompany,
    );
    return savedCompany;
  }

  async remove(id: string) {
    const foundCompany: Company = await this.companyRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundCompany) {
      throw new Error('COMPANY_NOT_FOUND');
    }
    await this.companyRepository.delete(foundCompany.id);
  }
}
