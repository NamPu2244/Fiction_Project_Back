import { Test, TestingModule } from '@nestjs/testing';
import { EspisodesController } from './espisodes.controller';
import { EspisodesService } from './espisodes.service';

describe('EspisodesController', () => {
  let controller: EspisodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspisodesController],
      providers: [EspisodesService],
    }).compile();

    controller = module.get<EspisodesController>(EspisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
