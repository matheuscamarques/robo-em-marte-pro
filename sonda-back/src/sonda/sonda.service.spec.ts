import { Test, TestingModule } from '@nestjs/testing';
import { SondaService } from './sonda.service';

describe('SondaService', () => {
  let service: SondaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SondaService],
    }).compile();

    service = module.get<SondaService>(SondaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
