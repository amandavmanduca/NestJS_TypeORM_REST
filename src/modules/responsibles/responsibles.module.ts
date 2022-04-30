import { Module } from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { ResponsiblesController } from './responsibles.controller';
import { Responsible } from './entities/responsible.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Responsible])],
  controllers: [ResponsiblesController],
  providers: [ResponsiblesService],
})
export class ResponsiblesModule {}
