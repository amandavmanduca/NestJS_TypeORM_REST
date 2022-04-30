import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Responsible } from '../responsibles/entities/responsible.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Responsible])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
