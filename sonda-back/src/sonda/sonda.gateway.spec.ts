import { Test, TestingModule } from '@nestjs/testing';
import { SondaGateway } from './sonda.gateway';
import { SondaService } from './sonda.service';

describe('SondaGateway', () => {
  let gateway: SondaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SondaGateway, SondaService],
    }).compile();

    gateway = module.get<SondaGateway>(SondaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
