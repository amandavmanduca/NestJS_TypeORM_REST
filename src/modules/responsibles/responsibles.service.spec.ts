import { Test, TestingModule } from '@nestjs/testing';
import { ResponsiblesService } from './responsibles.service';

describe('ResponsiblesService', () => {
  let service: ResponsiblesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsiblesService],
    }).compile();

    service = module.get<ResponsiblesService>(ResponsiblesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
