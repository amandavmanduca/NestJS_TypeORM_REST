import { Test, TestingModule } from '@nestjs/testing';
import { ResponsiblesController } from './responsibles.controller';
import { ResponsiblesService } from './responsibles.service';

describe('ResponsiblesController', () => {
  let controller: ResponsiblesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsiblesController],
      providers: [ResponsiblesService],
    }).compile();

    controller = module.get<ResponsiblesController>(ResponsiblesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
