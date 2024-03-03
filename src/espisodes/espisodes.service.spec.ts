import { Test, TestingModule } from '@nestjs/testing';
import { EspisodesService } from './espisodes.service';

describe('EspisodesService', () => {
  let service: EspisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspisodesService],
    }).compile();

    service = module.get<EspisodesService>(EspisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
